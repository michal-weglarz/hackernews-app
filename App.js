import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Constants } from 'expo';

import Feed from './components/Feed';
import WebView from './components/WebComponent';
import Comments from './components/Comments';

import { createStackNavigator, createAppContainer } from 'react-navigation';

const RootStack = createStackNavigator({
	Home: {
		screen: Feed,
	},
	WebView: {
		screen: WebView,
	},
	Comments: {
		screen: Comments,
		navigationOptions: {
			headerTintColor: '#ffffff',
		},
	},
});

const App = createAppContainer(RootStack);

export default App;
