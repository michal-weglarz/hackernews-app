import * as React from 'react';
import {
	View,
	FlatList,
	WebView,
	Dimensions,
	ScrollView,
	Text,
} from 'react-native';
import HTML from 'react-native-render-html';

export default class Comments extends React.Component {
	static navigationOptions = {
		title: 'Comments',
		headerStyle: {
			backgroundColor: '#ff6600',
		},
		headerTitleStyle: {
			color: '#ffffff',
		},
	};

	constructor(props) {
		super(props);
		this.state = {
			comments: [],
		};
	}

	componentDidMount = () => {
		this.props.navigation.state.params.kids.forEach(itemID => {
			this.fetchComment(itemID);
		});
	};

	// componentWillUnmount() {
	// 	this.setState({
	// 		comments: [],
	// 	});
	// }

	fetchComment = itemID => {
		fetch(
			` https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`
		)
			.then(response => {
				return response.json();
			})
			.then(response =>
				this.setState({
					comments: [...this.state.comments, response],
				})
			)
			.catch(err => console.log(err));
	};

	render() {
		console.log(this.state.comments);
		return (
			<ScrollView style={{ flex: 1 }}>
				<FlatList
					data={this.state.comments}
					renderItem={({ item }) => <HTML html={item.text} />}
					keyExtractor={item => item.id.toString()}
				/>
			</ScrollView>
		);
	}
}
