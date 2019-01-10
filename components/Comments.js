import * as React from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
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
		return (
			<View>
				{this.state.isLoading && this.renderFooter()}
				{this.state.comments && (
					<RenderComments
						data={this.state.comments}
						renderSeparator={this.renderSeparator}
						renderFooter={this.renderFooter}
					/>
				)}
			</View>
		);
	}
}

const RenderComments = ({ data }) => {
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<View
					style={{
						paddingLeft: 12,
						borderLeftWidth: 1,
						borderColor: '#E0E0DA',
						paddingTop: 0,
					}}
				>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'flex-start',
							backgroundColor: '#F6F6F6',
							padding: 8,
						}}
					>
						<Text style={{ color: '#ff6600' }}>{item.user || 'deleted'} </Text>
						<Text style={{ color: '#A3A39F' }}>
							{item.user ? `- ${item.time_ago}` : ''}
						</Text>
					</View>
					<View>
						<HTML html={item.user ? item.content : '<div><span/></div>'} />
						{item.comments && <RenderComments data={item.comments} />}
					</View>
				</View>
			)}
			keyExtractor={item => item.id.toString()}
		/>
	);
};
