import { View, Text, TouchableHighlight, Image,
	TabBarIOS, NavigationExperimental } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';
import Feed from '../Feed';
import { connect } from 'react-redux';
const { Reducer: NavigationReducer } = NavigationExperimental;
const { JumpToAction } = NavigationReducer.TabsReducer;

class ApplicationTabs extends Component {
	_renderTabContent(tab) {
		// XX: replace this with code to render specific components/containers
		// corresponding to tabs in your app, e.g.
		// if (tab.key === 'maps') {
		//   return <MapView />;
		// }

		if (tab.key === 'feed') {
			return (
				<Feed />
			);
		}

		if (tab.key === 'notifications') {
			return (
				<View style={[styles.tabContent, {backgroundColor: 'green'}]} />
			);
		}

		if (tab.key === 'settings') {
			return (
				<View style={[styles.tabContent, {backgroundColor: 'pink'}]} />
			);
		}
	}

	render() {
		const children = this.props.navigation.children.map( (tab, i) => {
			return (
				<TabBarIOS.Item key={tab.key}
						icon={tab.icon}
						selectedIcon={tab.selectedIcon}
						title={tab.title} onPress={
							() => this.props.onNavigate(JumpToAction(i))
						}
						selected={this.props.navigation.index === i}>
						{ this._renderTabContent(tab) }
				</TabBarIOS.Item>
			);
		});
		return (
			<TabBarIOS tintColor="black">
				{children}
			</TabBarIOS>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('tabs')
	};
}
export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, stateProps, dispatchProps, {
		onNavigate: (action) => {
			dispatchProps.dispatch(Object.assign(action, {
				scope: stateProps.navigation.key
			}));
		}
	});
})(ApplicationTabs);
