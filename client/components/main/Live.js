import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { API_URL } from '@env'


export default function Live() {
	const streamUri = `${API_URL}video_feed`

	return (
		<View style={styles.container}>
			{
				streamUri ? 
					<Image
						style={styles.image}
						source={{
							uri: streamUri,
							method: 'POST',
							cache: 'reload',
							headers: {
								Pragma: 'no-cache'
							},
						}}/> 
				: <ActivityIndicator color="#4B6951"/>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'contain' 
	},
	container: {
		flex: 1,
	}
  });