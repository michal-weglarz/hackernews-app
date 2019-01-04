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
		this.state = { data: [], feed: [] };
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

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View>
				{this.state.isLoading && <ActivityIndicator size="large" />}
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
										padding: 12,
									}}
								>
									<Text style={{ fontSize: 18 }}>{item.title}</Text>
									<View
										style={{
											flex: 1,
											flexDirection: 'row',
											justifyContent: 'space-between',
										}}
									>
										<Text>{item.score} </Text>
										<Text>{item.by} </Text>
									</View>
								</View>
								<View
									style={{
										flex: 1,
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: '#F9F9F4',
									}}
								>
									<Icon name="comment" type="octicon" color="#FFAB73" />
									<Text style={{ color: '#FF8738' }}>{item.descendants}</Text>
								</View>
							</TouchableOpacity>
						</View>
					)}
					keyExtractor={(item, index) => item.id.toString()}
				/>
			</View>
		);
	}
}
