import * as React from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';

export default class Stories extends React.Component {
	constructor(props) {
		super(props);
		this.state = { sourceItems: [], isLoading: true };
	}

	fetchStory = itemID => {
		return fetch(
			`https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`
		)
			.then(response => response.json())
			.then(data =>
				this.setState({
					isLoading: false,
					sourceItems: [...this.state.sourceItems, data],
				})
			);
	};

	render() {
		const { data } = this.props;
		console.log(this.state.sourceItems);
		return (
			<View>
				<Button
					title="Press to fetch"
					style={{ width: 200 }}
					onPress={this.fetchStory}
				/>
			</View>
		);
	}
}
