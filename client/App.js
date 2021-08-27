import React from 'react';
import { Text, View, Image, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <SafeAreaView>
      <Text>Livestream</Text>
	 {/*  <Image style={{flex: 1, height: 380, width: 640}} source={{ uri: "https://2def-2a02-1812-1639-b00-d2c6-fa18-e342-75a9.ngrok.io/video_feed"}}/> */}

	  <Image
		source={{
			uri: 'https://2def-2a02-1812-1639-b00-d2c6-fa18-e342-75a9.ngrok.io/video_feed',
			method: 'GET',
		}}
		style={{ width: 640, height: 380 }}
		/>


    </SafeAreaView>
  );
};
