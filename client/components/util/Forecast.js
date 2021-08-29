import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import axios from 'axios'
import { API_URL } from '@env'


export default function Forecast() {
	const [ forecast, setForecast ] = useState()
	const forecastApi = `${API_URL}api/forecast`

	useEffect(() => {
		getForecast()
	}, [])
	
	const getForecast = async () => {
		try {
			const response = await axios.get(forecastApi)
			setForecast(response.data)
		} catch (err) {
			return err.message
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Server Info</Text>
			{
				forecast ? 
					<View>
						<Text><Text style={{fontWeight: "bold"}}>Humidity:</Text> {forecast.humidity}</Text>
						<Text><Text style={{fontWeight: "bold"}}>Pressure:</Text> {forecast.pressure}</Text>
						<Text><Text style={{fontWeight: "bold"}}>Temprature:</Text> {forecast.temperature}</Text>
					</View>
				: null
			}
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
	},
	title: {
		fontWeight: 700,
		fontSize: 16,
		paddingBottom: 2,
	},

});