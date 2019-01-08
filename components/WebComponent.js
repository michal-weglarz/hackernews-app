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
		const address =
			this.props.navigation.state.params.uri ||
			`https://news.ycombinator.com/item?id=${
				this.props.navigation.state.params.id
			}`;
		console.log(address);
		return (
			<WebView
				source={{
					uri: address,
				}}
				renderLoading={this.renderLoadingView}
				startInLoadingState={true}
				automaticallyAdjustContentInsets={true}
				domStorageEnabled={true}
				onError={() => <Text>Failed to load</Text>}
			/>
		);
	}
}
