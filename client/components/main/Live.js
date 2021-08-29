import React from 'react'
import { View, Text, Image } from 'react-native'
import { API_URL } from '@env'

export default function Live() {
	const streamUri = `${API_URL}video_feed`

	return (
		<View>
			{
				streamUri ? 
				<Image
				style={{ width: 640, height: 380, resizeMode: 'contain' }}
				source={{
					uri: streamUri,
					method: 'POST',
					cache: 'reload',
					headers: {
						Pragma: 'no-cache'
					},
				}}/> : null
			}
		</View>
	)
}
