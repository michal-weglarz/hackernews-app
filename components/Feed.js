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
		this.state = { isFetching: false, data: [], page: 1 };
	}

	componentDidMount = () => {
		this.fetchData(this.state.page);
	};

	fetchData = async page => {
		let response = await fetch(`https://api.hnpwa.com/v0/news/${page}.json`);
		let data = await response.json();
		this.setState({
			data,
			isFetching: false,
		});
	};

	fetchMore = () => {
		this.setState(
			{
				page: (this.state.page += 1),
			},
			() => this.fetchData(this.state.page)
		);
	};

	onRefresh = () => {
		this.setState({ isFetching: true }, () => {
			this.fetchData(1);
		});
	};

	// timeOfCreation = timestamp => {
	// 	let currentTime = new Date().getTime() / 1000;
	// 	let timePassed = currentTime - timestamp;
	// 	let daysPassed = Math.floor(timePassed / 86400);
	// 	let hoursPassed = Math.floor(timePassed / 3600);
	// 	let minutesPassed = Math.floor(timePassed / 60);
	// 	let humanReadableTime =
	// 		(daysPassed && `${daysPassed} ${daysPassed == 1 ? 'day' : 'days'} ago`) ||
	// 		(hoursPassed &&
	// 			`${hoursPassed} ${hoursPassed == 1 ? 'hour' : 'hours'} ago`) ||
	// 		`${minutesPassed} ${minutesPassed == 1 ? 'minute' : 'minutes'} ago`;
	// 	return humanReadableTime;
	// };

	cleanUrl = url => {
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
				cleanUrl={this.cleanUrl}
				page={this.state.page}
				fetchMore={this.fetchMore}
			/>
		);
	}
}
