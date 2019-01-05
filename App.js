import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import { Constants } from 'expo';
import Feed from './components/Feed';
import WebView from './components/WebComponent';

import { createStackNavigator, createAppContainer } from 'react-navigation';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingTop: Constants.statusBarHeight,
		justifyContent: 'center',
	},
});

class HomeScreen extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Feed />
			</View>
		);
	}
}

const RootStack = createStackNavigator({
	Home: {
		screen: Feed,
	},
	WebView: {
		screen: WebView,
		navigationOptions: {
			headerTintColor: '#ffffff',
		},
	},
});

const App = createAppContainer(RootStack);

export default App;
