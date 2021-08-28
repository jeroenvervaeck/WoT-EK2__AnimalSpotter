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
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="live-tv" color={color} size={26}/>
					), headerShown: false
				}}/>
				<Tab.Screen name="History" component={HistoryScreen} options={{
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="history" color={color} size={26}/>
					)
				}}/>
				<Tab.Screen name="Me" children={() => <AccountScreen props={currentUser}/> }  options={{
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="account-circle" color={color} size={26}/>
					), headerShown: false
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
