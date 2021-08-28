import React, { Component } from 'react';
import { Text, View } from 'react-native';

import firebase from 'firebase'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

// Envoirment variables in production
const firebaseConfig = {
	apiKey: "AIzaSyBth7LLmmuDOONVJXSIPXZc-ouvpwB3NqM",
	authDomain: "livecam-2e38f.firebaseapp.com",
	projectId: "livecam-2e38f",
	storageBucket: "livecam-2e38f.appspot.com",
	messagingSenderId: "543866354984",
	appId: "1:543866354984:web:7f7b7d19abc8c1c79a241d",
	measurementId: "G-DFLMGRM7LZ"
};

if(firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import MainScreen from './components/main'

const Stack = createStackNavigator();

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		}
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if(!user){
				this.setState({
					loggedIn: false,
					loaded: true,
				})
			} else {
				this.setState({
					loggedIn: true,
					loaded: true,
				})
			}
		})
	}
	render() {
		const { loggedIn, loaded } = this.state;
		if (!loaded) {
			return (
				<View style={{flex: 1, justifyContent: 'center'}}>
					<Text>Loading...</Text>
				</View>
			)
		}

		if (!loggedIn ) {
			return (
				<NavigationContainer>
					<Stack.Navigator initialRouteName='Landing'>
						<Stack.Screen name="Landing" component={LandingScreen}/>
						<Stack.Screen name="Register" component={RegisterScreen}/>
					</Stack.Navigator>
				</NavigationContainer>
			)
		}

		return (
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='Main'>
						<Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false}}/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		)
	}
}

export default App
