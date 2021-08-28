# Frontdoor Cam #
Een project waarbij de veiligheid van uw huis veiliger is dan een fluogeel zebrapad in Noorwegen.

## Server ##
Hier gebeurt al de logica van het IOT device. 

#### app.py ####
Dit script zorgt volledig voor het streamen van de live videobeelden en de verwerking ervan.

!! Dit werkt enkel op de Raspberry Pi van Jeroen momenteel. Je zal de nodige libraries moeten instaleren voor dat je de server kan runnen.

`cd server && phyton3 app.py`

Met een Ngrok pipe sturen we ons flask project op het web. 

`ngrok http 5000`

Link naar onze server: THIS HAS TO CHANGE

docs:

https://github.com/IntelRealSense/librealsense/blob/master/wrappers/python/examples/opencv_viewer_example.py?fbclid=IwAR3-qCFLTdtuWJg9xy60z_cnt8_bHcFoBB_ozJBi_JG67Jttfh1m5HkJrWI

#### frame.jpg ####
Dit zal altijd een screenshot zijn van het laatste beeld dat de camera heeft.

## Client ##
Hier begeeft zich de front-end waarbij de video en data wordt opgevangen vanuit de server.

Opstarten van client: 
`cd client && yarn start`

- - - -

Gemaakt door Jeroen Vervaeck en Yentel De Hauwere
