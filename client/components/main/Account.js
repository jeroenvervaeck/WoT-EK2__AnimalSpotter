import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Image } from 'react-native'
import { ButtonLarge } from '../buttons'
import Forecast from '../util/Forecast'


import firebase from 'firebase'
require('firebase/firestore')

const Logout = () => {
	firebase.auth().signOut();
}

export default function Account(props) {
	console.log(props)

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome, {props.props.name}</Text>
			<Text style={styles.mail}>{props.props.email}</Text>
			<Forecast />
			<ButtonLarge title="Log out" onPress={() => Logout()}/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},

	title: {
		fontSize: 20,
		fontWeight: 700,
	},
	mail: {
		paddingVertical: 4,
	}
});