import * as React from 'react';
import {
	WebView,
	View,
	ActivityIndicator,
	Share,
	Text,
	Platform,
	TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class WebComponent extends React.PureComponent {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Article',
			headerStyle: {
				backgroundColor: '#ff6600',
			},
			headerTitleStyle: {
				color: '#ffffff',
			},
			headerTintColor: '#ffffff',
			headerRight: (
				<TouchableOpacity
					onPress={() => {
						Share.share(
							{
								...Platform.select({
									ios: {
										message: 'It might interest you: ',
										url: navigation.getParam('uri'),
									},
									android: {
										message: `"${
											navigation.state.params.title
										}"  ${navigation.getParam('uri')}`,
									},
								}),
							},
							{
								...Platform.select({
									ios: {
										excludedActivityTypes: [
											'com.apple.UIKit.activity.PostToTwitter',
										],
									},
									android: {
										dialogTitle: `Share: ${navigation.state.params.title}`,
									},
								}),
							}
						);
					}}
				>
					<View
						style={{
							marginRight: 20,
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Icon name="forward" type="entypo" color="#fff" />
						<Text style={{ color: '#fff' }}> Share</Text>
					</View>
				</TouchableOpacity>
			),
		};
	};

	componentDidMount = () => {
		this.props.navigation.setParams({
			uri: this.props.navigation.state.params.uri,
		});
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
		const address = this.props.navigation.state.params.uri;
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
