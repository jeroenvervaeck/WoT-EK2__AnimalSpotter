import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function ButtonLarge({title, onPress}) {
	return (
		<TouchableOpacity onPress={ onPress }>
			<View style={styles.button}>
				<Text style={styles.text}>{ title }</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#4B6951",
		shadowOffset: { width: 0, height: 5 },
		shadowColor:  "#4B6951",
		color: 'white',
		shadowOpacity: 0.1,
		shadowRadius: 5,
		borderRadius: 10,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textTransform: 'capitalize',
		paddingVertical: 10,
		marginVertical: 10,
		paddingHorizontal: 100,
	},
	text: {
		color: 'white',
		fontSize: 15,
		textTransform: 'uppercase',
	}
});