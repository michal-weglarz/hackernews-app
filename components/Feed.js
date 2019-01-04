import * as React from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
} from 'react-native';

export default class Feed extends React.Component {
	static navigationOptions = {
		title: 'Hacker news',
		headerStyle: {
			backgroundColor: '#ff6600',
		},
		headerTitleStyle: {
			color: '#ffffff',
		},
	};

	constructor(props) {
		super(props);
		this.state = { isLoading: true, data: [], feed: [] };
	}

	componentDidMount(prevProps, prevState) {
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
								isLoading: false,
								data: [...this.state.data, data],
							})
						)
				)
			)
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View>
				{this.state.isLoading && <ActivityIndicator size="large" />}
				<FlatList
					data={this.state.data.slice(0, 20)}
					renderItem={({ item }) => (
						<View>
							<TouchableOpacity
								onPress={() => {
									navigate('WebView', { uri: item.url });
								}}
								style={{
									borderBottomWidth: 1,
									borderBottomColor: 'black',
									flex: 1,
									flexDirection: 'row',
								}}
							>
								<View style={{ maxWidth: 350 }}>
									<Text style={{ fontSize: 18 }}>{item.title}</Text>
									<Text>by: {item.by}</Text>
									<Text>Score: {item.score}</Text>
								</View>
								<View>
									<Text>{item.descendants}</Text>
								</View>
							</TouchableOpacity>
						</View>
					)}
					keyExtractor={(item, index) => item.id}
				/>
			</View>
		);
	}
}
