# Animal Spotter #

### Artevelde Hogeschool | Jeroen Vervaeck & Yentel De Hauwere | 3MMP-NMD

Een project waarbij je niet uitdroogd op een safari, maar rustig in je zetel de exotische dieren kan spotten.

Het product is gemaakt om dieren te spotten, wanneer je zelf niet in de omgeving bent. Dit kan bijvoorbeeld in een boom, aan een vijver of in een vogelhuisje. 

De camera wordt bijvoorbeeld aan een vijver gezet. Wanneer een dier in zicht van de camera komt, krijgt de gebruiker een melding dat er een dier is gedetecteerd. De app neemt een screenshot van het dier en slaagt dit op. Zo kan de gebruiker later zien welke dieren wanneer actief waren.

Veel geluk met dieren spotten! ;p

## Server ##
Hier gebeurt al de logica van het IOT device. 

#### app.py ####
Dit script zorgt volledig voor het streamen van de live videobeelden en de verwerking ervan.

!! Dit werkt enkel op de Raspberry Pi van Jeroen momenteel. Je zal de nodige libraries moeten instaleren voor dat je de server kan runnen.

`cd server && phyton3 app.py`

Met een Ngrok pipe sturen we ons flask project op het web. 

`ngrok http 5000`

#### API endpoints ####

`/video_feed`

`/api`

`/api/img?imgPath=`

`/api/forecast`

[Link naar onze server](https://35f8-2a02-1812-1639-b00-d2c6-fa18-e342-75a9.ngrok.io/)

docs:

https://dev.intelrealsense.com/docs/using-depth-camera-with-raspberry-pi-3

https://github.com/IntelRealSense/librealsense/blob/master/wrappers/python/examples/opencv_viewer_example.py?fbclid=IwAR3-qCFLTdtuWJg9xy60z_cnt8_bHcFoBB_ozJBi_JG67Jttfh1m5HkJrWI

## Client ##
Hier begeeft zich de front-end waarbij de video en data wordt opgevangen vanuit de server.
Deze werd ontwikkeld adhv [React Native](https://reactnative.dev/) en [Expo](https://docs.expo.dev/)

Opstarten van client: 
`cd client && yarn start`

[Link naar de app](https://expo.dev/@despotters/animalspot)

- - - -

Gemaakt door Jeroen Vervaeck en Yentel De Hauwere
