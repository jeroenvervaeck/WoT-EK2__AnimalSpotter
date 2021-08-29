import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, RefreshControl, FlatList } from 'react-native'
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
			timeStamp: '1630255943'
		}, 
		{
			animalType: 'cat',
			timeStamp: '1630258946'
		},
		{
			animalType: 'cow',
			timeStamp: '1630258943'
		}, 
		{
			animalType: 'moose',
			timeStamp: '1630258923'
		},
		{
			animalType: 'dog',
			timeStamp: '1630258923'
		}, 
		{
			animalType: 'cat',
			timeStamp: '1630256943'
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
		} catch (err) {
		  	return err.message
		}
	};

	const [animalImages, setAnimalImages] = useState()
	const getFuckingUrl = async (imgPath) => {
		try {
			const response = await axios.get(`${dataUrl}/image?imgPath=${imgPath}`)
			setAnimalImages(response.data)
		} catch (err) {
			return err.message
		}
	}

	useEffect(() => {
		detectedAnimals.forEach(animal => {
			getFuckingUrl(animal.imgPath)
		});
	}, [detectedAnimals])

	return (
		<ScrollView style={styles.container}>
			{ detectedAnimals.reverse().map((animal, key)=>(
				<View  style={styles.item} key={key}>
					<Image style={styles.image} source={{uri:`${dataUrl}/image?imgPath=${animal.imgPath}`}}/>
					<View style={styles.itemText}>
						<Text style={styles.title}>{ animal.animalType }</Text>
						<Text style={styles.date} >
							<SimpleDateTime 
								dateFormat="DMY" 
								dateSeparator="." 
								timeSeparator=":">
									{animal.timeStamp}
							</SimpleDateTime>
						</Text>
					</View>
				</View>
				)
			)}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	image: {
	  resizeMode: 'cover', 
	  width: 200,
	  height: 100,
	  borderTopStartRadius: 10,
	  borderBottomStartRadius: 10,
	},
	title: {
	  textTransform: 'capitalize',
	  fontSize: 18,
	  fontWeight: 500,
	},
	date: {
	  textTransform: 'uppercase',
	  fontSize: 10,
	},
	item: {
		marginVertical: 15,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 10,
	},
	itemText: {
		paddingHorizontal: 10,
		justifyContent: 'space-around',
	},
});