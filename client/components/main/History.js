import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'
import { API_URL } from '@env'
import SimpleDateTime  from 'react-simple-timestamp-to-date';

export default function History() {
	const [ detectedAnimals, setDetectedAnimals ] = useState([])
	const [ numberPeople, setNumberPeople] = useState()
	const [ dummy, setDummy ] = useState([
		{
			animalType: 'bird',
			timeStamp: '1630258927'
		}, 
		{
			animalType: 'dog',
			timeStamp: '1630258943'
		}
	])
	
	const dataUrl = `${API_URL}api`

	useEffect(() => {
		getDetectionAlerts()
	}, [])

	// AXIOS
	const getDetectionAlerts = async () => {
		try {
			const response = await axios.get(dataUrl);
			setDetectedAnimals(response.data.animalDetections.animals)
			setNumberPeople(response.data.numPerson)
			console.log(response.data)


		} catch (err) {
			console.log(err.message)
		  	return err.message
		}
	};

	useEffect(() => {
		console.log(detectedAnimals)
	}, [detectedAnimals])
	
	return (
		<View style={styles.container}>
			<ScrollView>
				{ detectedAnimals.map((animal, key)=>(
					<View key={key}>
						<Image style={styles.image} source={{uri:"https://images.unsplash.com/photo-1526045612212-70caf35c14df"}}/>
						<Text style={styles.text}>{ animal.animalType }</Text>
						<Text style={styles.date} >
							<SimpleDateTime 
								dateFormat="DMY" 
								dateSeparator="." 
								timeSeparator=":">
									{animal.timeStamp}
							</SimpleDateTime>
						</Text>
					</View>
					)
				)}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
	},
	image: {
	  resizeMode: 'cover', 
	  width: 200,
	  height: 100,
	},
	text: {
	  textTransform: 'uppercase',
	  fontSize: 18,
	},
	date: {
	  textTransform: 'uppercase',
	  fontSize: 10,
	}
  });