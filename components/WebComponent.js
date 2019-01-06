import * as React from 'react';
import { WebView, View, ActivityIndicator } from 'react-native';

export default class WebComponent extends React.PureComponent {
	static navigationOptions = {
		title: 'Article',
		headerStyle: {
			backgroundColor: '#ff6600',
		},
		headerTitleStyle: {
			color: '#ffffff',
		},
	};

	renderLoadingView = () => {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					flexDirection: 'row',
				}}
			>
				<ActivityIndicator color="#ff6600" size="large" />
			</View>
		);
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
