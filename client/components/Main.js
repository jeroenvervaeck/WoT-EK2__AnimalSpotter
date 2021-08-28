import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from 'react-native-vector-icons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import AccountScreen from './main/Account'
import LiveScreen from './main/Live'
import HistoryScreen from './main/History'

const Tab = createBottomTabNavigator();

export class Main extends Component {
	componentDidMount() {
		this.props.fetchUser()
	}

	render() {
		const { currentUser } = this.props;

		return (
			<Tab.Navigator>
				<Tab.Screen name="Live" component={LiveScreen} options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="live-tv" color={color} size={26}/>
					)
				}}/>
				<Tab.Screen name="History" component={HistoryScreen} options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="history" color={color} size={26}/>
					)
				}}/>
				<Tab.Screen name="Me" component={AccountScreen} options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account-circle" color={color} size={26}/>
					)
				}}/>
			</Tab.Navigator>
		)
	}
}

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)
