import * as React from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class Feed extends React.Component {
	static navigationOptions = {
		title: 'Top Stories',
		headerStyle: {
			backgroundColor: '#ff6600',
		},
		headerTitleStyle: {
			color: '#F6F6EF',
		},
	};

	constructor(props) {
		super(props);
		this.state = { loading: false, data: [] };
	}

	componentDidMount() {
		fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
			.then(response => response.json())
			.then(data =>
				data.map(itemID =>
					fetch(
						`https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`
					)
						.then(response => response.json())
						.then(data =>
							this.setState({
								data: [...this.state.data, data],
							})
						)
				)
			)
			.catch(error => {
				console.log('Error', error);
			});
	}

	renderFooter = () => {
		return (
			<View
				style={{
					paddingVertical: 30,
				}}
			>
				<ActivityIndicator animating color="#ff6600" size="large" />
			</View>
		);
	};

	timeOfCreation = timestamp => {
		let currentTime = new Date().getTime() / 1000;
		let timePassed = currentTime - timestamp;
		let hoursPassed = Math.floor(timePassed / 3600);
		let minutesPassed = Math.floor(timePassed / 60);
		let humanReadableTime =
			(hoursPassed &&
				`${hoursPassed} ${hoursPassed == 1 ? 'hour' : 'hours'} ago`) ||
			`${minutesPassed} ${minutesPassed == 1 ? 'minute' : 'minutes'} ago`;
		return humanReadableTime;
	};

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View>
				<FlatList
					data={this.state.data}
					renderItem={({ item }) => (
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<TouchableOpacity
								onPress={() => {
									navigate('WebView', { uri: item.url });
								}}
								style={{
									borderBottomWidth: 1,
									borderBottomColor: '#E0E0DA',
									flex: 1,
									flexDirection: 'row',
								}}
							>
								<View
									style={{
										flex: 5,
										padding: 13,
									}}
								>
									<Text style={{ fontSize: 18 }}>{item.title}</Text>
									<View
										style={{
											flex: 1,
											flexDirection: 'row',
											justifyContent: 'flex-start',
										}}
									>
										<Text
											style={{
												color: '#A3A39F',
												marginRight: 10,
												backgroundColor: '#F6F6F6',
												padding: 3,
												borderRadius: 4,
											}}
										>
											{item.score}
										</Text>
										<Text
											style={{ color: '#A3A39F', marginRight: 10, padding: 3 }}
										>
											{item.by}
										</Text>
										<Text
											style={{
												color: '#A3A39F',
												paddingRight: 3,
												paddingTop: 3,
												paddingBottom: 3,
												paddingLeft: 0,
											}}
										>
											{this.timeOfCreation(item.time)}
										</Text>
									</View>
									<Text style={{ color: '#A3A39F' }} numberOfLines={1}>
										{item.url}
									</Text>
								</View>
								<View
									style={{
										flex: 1,
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: '#F9F9F4',
									}}
								>
									<Icon name="comment-o" type="font-awesome" color="#FFAB73" />
									<Text style={{ color: '#FF8738', marginTop: 6 }}>
										{item.descendants}
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					)}
					keyExtractor={(item, index) => item.id.toString()}
					ListFooterComponent={this.renderFooter}
				/>
			</View>
		);
	}
}
