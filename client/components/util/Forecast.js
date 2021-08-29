import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
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
			console.log(err.message)
			return err.message
		}
	};

	useEffect(() => {
		console.log(forecast)
	}, [forecast])

	return (
		<View>
			{
				forecast ? 
					<View>
						<Text>Humidity: {forecast.humidity} %</Text>
						<Text>Pressure: {forecast.pressure} Pa</Text>
						<Text>Temprature: {forecast.temperature} °C</Text>
					</View>
				: null
			}
		</View>
	)
}
