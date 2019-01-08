import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
});

export default class Comment extends React.Component {
	render() {
		const { author, content, time_ago } = this.props;
		return (
			<View style={{ padding: 20 }}>
				<View style={[styles.container, { paddingBottom: 8 }]}>
					<Text style={{ color: '#ff6600' }}>{author} </Text>
					<Text style={{ color: '#E0E0DA' }}>- {time_ago}</Text>
				</View>
				<View style={[styles.container, { paddingTop: 0 }]}>
					<HTML html={content} />
				</View>
			</View>
		);
	}
}
