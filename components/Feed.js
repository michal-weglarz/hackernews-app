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
