import React from 'react'
import { View, Text, Image } from 'react-native'
import axios from 'axios';

export default function Live() {
	const stream = "https://8a52-2a02-1812-1639-b00-d2c6-fa18-e342-75a9.ngrok.io/video_feed"
	const dataUrl = "https://8a52-2a02-1812-1639-b00-d2c6-fa18-e342-75a9.ngrok.io/api"
	// AXIOS
	const getDataUsingAsyncAwaitGetCall = async () => {
		try {
		  const response = await axios.get(dataUrl);
		  console.log(response.data)
		  return JSON.stringify(response.data)

		} catch (error) {
			console.log(error.message)
		  return error.message
		}
	};

	getDataUsingAsyncAwaitGetCall()

	return (
		<View>
			<Image
				style={{ width: 640, height: 380, resizeMode: 'contain' }}
				source={{
					uri: stream,
					method: 'POST',
					cache: 'reload',
					headers: {
						Pragma: 'no-cache'
					},
				}}/>
		</View>
	)
}
