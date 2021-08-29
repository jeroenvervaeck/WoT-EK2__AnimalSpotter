import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet } from 'react-native'
import { ButtonLarge } from '../buttons'
import firebase from 'firebase'

export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}

		this.onSignUp = this.onSignUp.bind(this)
	}
	onSignUp() {
		const { email, password, name } = this.state;
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((result) => {
			firebase.firestore().collection("users")
			.doc(firebase.auth().currentUser.uid)
			.set({
				name, 
				email
			})
			console.log(result)
		})
		.catch((error) => {
			console.log(error)
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput 
					style={styles.input}
					placeholder='name'
					onChangeText={(name) => this.setState({ name })}
				/>
				<TextInput 
					style={styles.input}
					placeholder='email'
					onChangeText={(email) => this.setState({ email })}
				/>
				<TextInput 
					style={styles.input}
					placeholder='password'
					secureTextEntry={true}
					onChangeText={(password) => this.setState({ password })}
				/>

				<ButtonLarge title="Register" onPress={() => this.onSignUp()}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	input: {
		paddingHorizontal: 4,
		paddingVertical: 8,
		marginVertical: 6,
	}
});

export default Register
