import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import axios from 'axios'

export default function Forecast() {
	const dataUrl = "https://8a52-2a02-1812-1639-b00-d2c6-fa18-e342-75a9.ngrok.io/api/forecast"

	const [ forecast, setForecast ] = useState({})

	useEffect(() => {
		getDataUsingAsyncAwaitGetCall()
	}, [])
	
	const getDataUsingAsyncAwaitGetCall = async () => {
		try {
			const response = await axios.get(dataUrl)
			setForecast(response)
		} catch (error) {
			console.log(error.message)
			return error.message
		}
	};

	useEffect(() => {
		console.log(forecast.data)
	}, [forecast])

	return (
		<View>

		</View>
	)
}
