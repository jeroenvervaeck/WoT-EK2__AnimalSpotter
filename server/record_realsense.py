import pyrealsense2 as rs
import numpy as np
import cv2

if __name__ == '__main__':
    # Configure depth and color streams
    pipeline = rs.pipeline()
    config = rs.config()
    config.enable_stream(rs.stream.color, 640, 480, rs.format.bgr8, 15)

    # Start streaming
    pipeline.start(config)
    
    # Get the Model for the item detection
    cvNet = cv2.dnn.readNetFromTensorflow('/home/pi/code/models/frozen_inference_graph_2.pb', '/home/pi/code/models/likeand.pbtxt')
    
    try:
        while True:
            # Wait for a coherent pair of frames: depth and color
            frames = pipeline.wait_for_frames()
            color_frame = frames.get_color_frame()
            if not color_frame:
                continue

            # Convert images to numpy arrays
            img = np.asanyarray(color_frame.get_data())

            rows = img.shape[0]
            cols = img.shape[1]
            cvNet.setInput(cv2.dnn.blobFromImage(img))
            cvOut = cvNet.forward()

            for detection in cvOut[0,0,:,:]:
                score = float(detection[2])
                if score > 0.5:
                    print(detection)
                    left = detection[3] * cols
                    top = detection[4] * rows
                    right = detection[5] * cols
                    bottom = detection[6] * rows
                    cv2.rectangle(img, (int(left), int(top)), (int(right), int(bottom)), (23, 230, 210), thickness=2)
            
            # TODO: Stream img to phone
            
            
            # Show images
            cv2.imshow('RealSense', img)
            key = cv2.waitKey(1)

            if key == 27:
                cv2.destroyAllWindows()
                break
    finally:
        # Stop streaming
        pipeline.stop()