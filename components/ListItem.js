import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
	sideText: { color: '#A3A39F', marginRight: 10, padding: 3 },
});

export default class ListItem extends React.PureComponent {
	render() {
		const { item, navigate, time, url } = this.props;

		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
				}}
			>
				<TouchableOpacity
					style={{ flex: 5 }}
					onPress={() => {
						navigate('WebView', { uri: item.url });
					}}
				>
					<View
						style={{
							padding: 13,
						}}
					>
						<Text style={{ fontSize: 18 }}>{item.title}</Text>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'flex-start',
							}}
						>
							<Text
								style={{
									...styles.sideText,
									backgroundColor: '#F6F6F6',
									borderRadius: 4,
								}}
							>
								{item.score}
							</Text>
							<Text style={styles.sideText}>{item.by}</Text>
							<Text style={styles.sideText}>{time}</Text>
						</View>
						<Text style={styles.sideText} numberOfLines={1}>
							{url(item.url)}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#F9F9F4',
					}}
					onPress={() => {
						navigate('Comments', { kids: item.kids });
					}}
				>
					<Icon name="comment-o" type="font-awesome" color="#FFAB73" />
					<Text style={{ color: '#FF8738', marginTop: 6 }}>
						{item.descendants}
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
