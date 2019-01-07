import * as React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

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
		const { data, navigate, isFetching, onRefresh, time } = this.props;
		return (
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<ListItem item={item} navigate={navigate} time={time(item.time)} />
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
