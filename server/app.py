import pyrealsense2 as rs
import numpy as np
import cv2
import tensorflow as tf
import base64
from datetime import timezone
import datetime
from flask import Flask, render_template, Response, jsonify, request, send_file, make_response
from sense_hat import SenseHat

# init flask
app = Flask(__name__,template_folder='templates')

sense = SenseHat()
sense.clear()

# global variables
numPerson = 0

temperature = 0
humidity = 0
pressure = 0

animalDetections = {'animals': []}

### Main ###
@app.route('/')
def index():
    return render_template('index.html')

def gen(pipeline, interpreter, labels, input_details, output_details):
    try:
        # Get global variables
        global numPerson
        global animalDetections
        
        # Make local variables
        timer = 0
        detection = False
        
        while True:

            # Temperary store the amount of persons
            numPersonTmp = 0
            
            # Wait for a color frame
            frames = pipeline.wait_for_frames()
            color_frame = frames.get_color_frame()
            if not color_frame:
                continue

            # Convert images to numpy arrays
            img = np.asanyarray(color_frame.get_data())

            frame_resized = cv2.resize(img, (300, 300))
            input_data = np.expand_dims(frame_resized, axis=0)

            interpreter.set_tensor(input_details[0]['index'], input_data)
            interpreter.invoke()

            boxes = interpreter.get_tensor(output_details[0]['index'])[0]  # Bounding box coordinates of detected objects
            classes = interpreter.get_tensor(output_details[1]['index'])[0]  # Class index of detected objects
            scores = interpreter.get_tensor(output_details[2]['index'])[0]  # Confidence of detected objects


            noDetections = True

            # Loop all the Detections
            for i in range(len(scores)):        
                if ((scores[i] > 0.6) and (scores[i] <= 1.0)):
                    # Get bounding box coordinates and draw box
                    # Interpreter can return coordinates that are outside of image dimensions, need to force them to be within image using max() and min()
                    ymin = int(max(1, (boxes[i][0] * 480)))
                    xmin = int(max(1, (boxes[i][1] * 640)))
                    ymax = int(min(480, (boxes[i][2] * 480)))
                    xmax = int(min(640, (boxes[i][3] * 640)))

                    # Draw label
                    object_name = labels[int(classes[i])]  # Look up object name from "labels" array using class index
                    
                    # Count the amount of people
                    if object_name == 'person':
                        numPersonTmp += 1
                    
                    # Animal detection
                    if object_name == 'bird' or object_name == 'cat' or object_name == 'dog' or object_name == 'horse' or object_name == 'sheep' or object_name == 'cow' or object_name == 'elephant' or object_name == 'bear' or object_name == 'zebra' or object_name == 'giraffe':
                        
                        # if something is detected. I don't want the timer to start counting down
                        # this way I don't get a image for every frame the animal is detected
                        noDetections = False
                        
                        if timer <= 0 and detection == False:
                            print( object_name + 'detected' )
                            
                            detection = True
                            timer = 12
                            dt = datetime.datetime.now(timezone.utc)
                            utc_time = dt.replace(tzinfo=timezone.utc)
                            time = str(utc_time.timestamp())
                            imgPath = "animals/photo_" + time + ".jpg"
                            
                            # write the image to the server
                            cv2.imwrite(imgPath, img)
                            
                            # append the animal object to the array
                            animal = { 'animalType': object_name, 'timeStamp': time, 'imgPath': imgPath}
                            animalDetections['animals'].append(animal)
                            
                    # draw the green square on the screen with corresponding label
                    cv2.rectangle(img, (xmin, ymin), (xmax, ymax), (10, 255, 0), 2)
                    label = '%s: %d%%' % (object_name, int(scores[i] * 100))
                    labelSize, baseLine = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 2)  # Get font size
                    label_ymin = max(ymin, labelSize[1] + 10)  # Make sure not to draw label too close to top of window
                    cv2.rectangle(img, (xmin, label_ymin - labelSize[1] - 10), (xmin + labelSize[0], label_ymin + baseLine - 10), (255, 255, 255), cv2.FILLED)  # Draw white box to put label text in
                    cv2.putText(img, label, (xmin, label_ymin - 7), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0),2)  # Draw label text

            # set global variable to the amount of persons
            numPerson = numPersonTmp
            
            if noDetections:
                timer = timer - 1
            print(timer)

            if timer == 0:
                detection = False

            # write the image to the server
            cv2.imwrite("frame.jpg", img)
            
            frame = open("frame" + '.jpg', 'rb').read()
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            
    finally:
        # Stop streaming
        pipeline.stop()

@app.route('/video_feed')
def video_feed():
    # Configure depth and color streams
    pipeline = rs.pipeline()
    config = rs.config()
    config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 15)

    # Start streaming
    pipeline.start(config)

    # Load the TFLite model in TFLite Interpreter
    interpreter = tf.lite.Interpreter("models/ssd_mobilenet_v1_1_metadata_1.tflite")
    interpreter.allocate_tensors()

    # Get model details
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    height = input_details[0]['shape'][1]
    width = input_details[0]['shape'][2]

    labels = 0
    with open('models/labelmap.txt', 'r') as f:
        labels = [line.strip() for line in f.readlines()]
    return Response(gen(pipeline, interpreter, labels, input_details, output_details), mimetype='multipart/x-mixed-replace; boundary=frame')

### API ###
@app.route('/api', methods=['GET'])
def get_data():
    global numPerson
    response = jsonify({'numPerson': numPerson, 'animalDetections': animalDetections})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('minetype', 'application/json')
    return response

@app.route('/api/forecast', methods=['GET'])
def get_data_forecast():
    global temperature
    global humidity
    global pressure
    
    # Get temperature
    temperature = sense.get_temperature_from_humidity()
    temperature = round(temperature, 1)
    
    # Get humidity
    humidity = sense.get_humidity()
    humidity = round(humidity, 1)
    # Get pressure
    pressure = sense.get_pressure()
    pressure = round(pressure, 1)
    
    response = jsonify({'temperature': temperature, 'humidity': humidity, 'pressure': pressure})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('minetype', 'application/json')
    return response


@app.route('/api/image', methods=['GET'])
def get_data_image():
    imgPath = request.args.get('imgPath')
    #im = open(imgPath, 'rb').read()
    #resp = Response(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + im + b'\r\n')
    #resp.headers['access-control-allow-origin'] = '*'
    #resp.mimetype = 'multipart/x-mixed-replace; boundary=frame'
    #return Response(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + im + b'\r\n', mimetype='multipart/x-mixed-replace; boundary=frame')
    resp = make_response(send_file(imgPath))
    resp.headers['access-control-allow-origin'] = '*'
    resp.headers['mimetype'] = 'image/jpeg'
    return resp


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

    