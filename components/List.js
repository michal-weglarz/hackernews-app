import * as React from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';

import ListItem from './ListItem';

export default class List extends React.PureComponent {
	renderSeparator = () => (
		<View style={{ borderBottomColor: '#E0E0DA', borderBottomWidth: 1 }} />
	);

	renderFooter = () => {
		return (
			<View
				style={{
					paddingVertical: 30,
				}}
			>
				<ActivityIndicator animating color="#ff6600" size="large" />
			</View>
		);
	};

	render() {
		const {
			data,
			navigate,
			isFetching,
			onRefresh,
			cleanUrl,
			page,
			fetchMore,
		} = this.props;
		return (
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<ListItem item={item} navigate={navigate} cleanUrl={cleanUrl} />
				)}
				keyExtractor={(item, index) => item.id.toString()}
				ItemSeparatorComponent={this.renderSeparator}
				ListFooterComponent={this.renderFooter}
				onRefresh={() => onRefresh}
				refreshing={isFetching}
				initialNumToRender={10}
				maxToRenderPerBatch={5}
				windowSize={3}
			/>
		);
	}
}
