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
import Comment from './Comment';
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
			isLoading: true,
		};
	}

	componentDidMount = () => {
		this.fetchComment(this.props.navigation.state.params.itemID);
	};

	fetchComment = async itemID => {
		let response = await fetch(`https://api.hnpwa.com/v0/item/${itemID}.json`);
		let data = await response.json();

		this.setState({
			comments: data.comments,
			isLoading: false,
		});
	};

	renderFooter = () => {
		if (!this.state.isLoading) return null;
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
		this.setState({
			isLoading: false,
		});
	};

	render() {
		console.log(this.state.comments);
		return (
			<View>
				{this.state.comments && <RenderComments data={this.state.comments} />}
			</View>
		);
	}
}

const RenderComments = ({ data }) => {
	return (
		<View style={{ padding: 5 }}>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<View
						style={{
							paddingLeft: 20,
							borderLeftWidth: 1,
							borderColor: '#E0E0DA',
						}}
					>
						<View>
							<Text style={{ color: '#ff6600' }}>{item.user} </Text>
							<Text style={{ color: '#E0E0DA' }}>- {item.time_ago}</Text>
						</View>
						<View>
							<HTML html={item.content} />
						</View>
						{item.comments && <RenderComments data={item.comments} />}
					</View>
				)}
				keyExtractor={(item, index) => item.id.toString()}
				ItemSeparatorComponent={this.renderSeparator}
				onEndReached={this.reachedEnd}
				onEndReachedThreshold={0.5}
				ListFooterComponent={this.renderFooter}
			/>
		</View>
	);
};
