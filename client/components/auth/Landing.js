import React from 'react'
import { TextBase, View, Button, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { ButtonLarge, ButtonLargeSecondary } from '../buttons'

export default function Landing({ navigation }) {
	return (
		<View style={styles.container}>
			<Image style={styles.image} 
				source={require('../../assets/unicorn.svg')}
				style = {{height: 200, width: 250, resizeMode : 'contain'}}/>
			<View>
				<ButtonLarge title="Log In" onPress={() => navigation.navigate('Login')}/>
				<ButtonLargeSecondary title="Register" onPress={() => navigation.navigate('Register')}/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 30,
		flex: 1, 
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	buttonPrimary: {
		borderRadius: 10,
		margin: 10,
	},
	button: {
		marginVertical: 10,
	}
});