import * as React from 'react';
import { WebView, View, ActivityIndicator } from 'react-native';

export default class WebComponent extends React.Component {
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
	}

	renderLoadingView = () => {
		return <ActivityIndicator color="#bc2b78" size="large" />;
	};

	render() {
		return (
			<WebView
				source={{ uri: this.props.navigation.state.params.uri }}
				renderLoading={this.renderLoadingView}
				startInLoadingState={true}
			/>
		);
	}
}
