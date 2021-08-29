import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'
import { API_URL } from '@env'
import SimpleDateTime  from 'react-simple-timestamp-to-date';

export default function History() {
	const [ detectedAnimals, setDetectedAnimals ] = useState([])
	const [ numberPeople, setNumberPeople] = useState()
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
			console.log(err.message)
		  	return err.message
		}
	};
	
	useEffect(() => {
		console.log(detectedAnimals)
	}, [detectedAnimals])

	useEffect(() => {
		console.log(numberPeople)
	}, [numberPeople])
	
	return (
		<View>
			{ detectedAnimals.map((animal, key)=>(
				<View key={key}>
					<Text> { animal.animalType } </Text>
					<SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{animal.timeStamp}</SimpleDateTime>
				</View>
				)
			)}
		</View>
	)
}
