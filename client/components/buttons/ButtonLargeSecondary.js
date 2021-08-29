import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function ButtonLargeSecondary({title, onPress}) {
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
		backgroundColor: 'rgba(52, 52, 52, 0.0)',
		borderRadius: 10,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textTransform: 'capitalize',
		paddingVertical: 10,
		paddingHorizontal: 100,
	},
	text: {
		color: '#4B6951',
		fontSize: 15,
		textTransform: 'uppercase',
	}
});