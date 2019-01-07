import * as React from 'react';

import List from './List';

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
		this.state = { isFetching: false, data: [] };
	}

	componentDidMount = () => {
		this.fetchData();
	};

	fetchData = () => {
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
								isFetching: false,
							})
						)
				)
			)
			.catch(error => {
				console.log('Error', error);
			});
	};

	onRefresh = () => {
		this.setState({ isFetching: true }, () => this.fetchData());
	};

	timeOfCreation = timestamp => {
		let currentTime = new Date().getTime() / 1000;
		let timePassed = currentTime - timestamp;
		let daysPassed = Math.floor(timePassed / 86400);
		let hoursPassed = Math.floor(timePassed / 3600);
		let minutesPassed = Math.floor(timePassed / 60);
		let humanReadableTime =
			(daysPassed && `${daysPassed} ${daysPassed == 1 ? 'day' : 'days'} ago`) ||
			(hoursPassed &&
				`${hoursPassed} ${hoursPassed == 1 ? 'hour' : 'hours'} ago`) ||
			`${minutesPassed} ${minutesPassed == 1 ? 'minute' : 'minutes'} ago`;
		return humanReadableTime;
	};

	getCleanedUrl = url => {
		if (url) return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
	};

	render() {
		const { navigate } = this.props.navigation;
		return (
			<List
				data={this.state.data}
				navigate={navigate}
				isFetching={this.state.isFetching}
				onRefresh={this.onRefresh}
				time={this.timeOfCreation}
				url={this.getCleanedUrl}
			/>
		);
	}
}
