import pyrealsense2 as rs
import numpy as np
#open cv : real time computer vision
import cv2
#platform for machine learning
import tensorflow as tf
#python framework
from flask import Flask, render_template, Response, jsonify

app = Flask(__name__,template_folder='templates')

# Global variables #
isPerson = "false"

### Main ###
@app.route('/')
def index():
    return render_template('index.html')

def gen(pipeline, interpreter, labels, input_details, output_details):
    try:
        while True:
            # Wait for a coherent pair of frames: depth and color
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
                    
                    isPerson = "false"
                    
                    if object_name == 'person':
                        
                        isPerson = "true"
                        
                        cv2.rectangle(img, (xmin, ymin), (xmax, ymax), (10, 255, 0), 2)
                        label = '%s: %d%%' % (object_name, int(scores[i] * 100))
                        labelSize, baseLine = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 2)  # Get font size
                        label_ymin = max(ymin, labelSize[1] + 10)  # Make sure not to draw label too close to top of window
                        cv2.rectangle(img, (xmin, label_ymin - labelSize[1] - 10), (xmin + labelSize[0], label_ymin + baseLine - 10), (255, 255, 255), cv2.FILLED)  # Draw white box to put label text in
                        cv2.putText(img, label, (xmin, label_ymin - 7), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0),2)  # Draw label text

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

@app.route('/api')
def get_data():
    while True:
        return jsonify({'isPerson': isPerson})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

    