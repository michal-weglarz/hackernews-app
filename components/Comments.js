import * as React from 'react';
import {
	View,
	FlatList,
	WebView,
	Dimensions,
	ScrollView,
	Text,
	ActivityIndicator,
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
		this.props.navigation.state.params.kids &&
			this.props.navigation.state.params.kids.forEach(itemID => {
				this.fetchComment(itemID);
			});
	};

	fetchComment = itemID => {
		fetch(
			`https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`
		)
			.then(response => response.json())
			.then(response => {
				this.setState({
					comments: [...this.state.comments, response],
				});
			})
			.catch(err => console.log(err));
	};

	renderFooter = () => {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					flexDirection: 'row',
					paddingVertical: 40,
				}}
			>
				<ActivityIndicator color="#ff6600" size="large" />
			</View>
		);
	};

	renderSeparator = () => (
		<View style={{ borderBottomColor: '#E0E0DA', borderBottomWidth: 1 }} />
	);

	reachedEnd = () => {
		return (
			<View>
				<Text>End of thread</Text>
			</View>
		);
	};

	render() {
		return (
			<FlatList
				data={this.state.comments}
				renderItem={({ item }) => <HTML html={item.text} />}
				keyExtractor={item => item.id.toString()}
				ItemSeparatorComponent={this.renderSeparator}
				onEndReached={this.reachedEnd}
				onEndReachedThreshold={0.5}
				ListFooterComponent={this.renderFooter}
			/>
		);
	}
}
