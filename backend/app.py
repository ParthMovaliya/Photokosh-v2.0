from flask import Flask, request, jsonify
import cv2
import os
from flask_cors import CORS
import base64
import numpy as np
import face_recognition

app = Flask(__name__)
CORS(app)

IMAGES_PATH = 'F:\\7th_3\\backend\\photos\\'
PARTH_FOLDER = "F:\\7th_3\\backend\\parth"
LABELLED_IMAGES_PATH = 'F:\\7th_3\\backend\\labelled\\'

P1 = "F:\\7th_3\\backend\\parth\\user.jpg" 
P2 = "F:\\7th_3\\backend\\parth\\A41I8758.JPG"

imgP1 = face_recognition.load_image_file(P1)
imgP1 = cv2.cvtColor(imgP1,cv2.COLOR_BGR2RGB)
imgP2 = face_recognition.load_image_file(P2)
imgP2 = cv2.cvtColor(imgP2,cv2.COLOR_BGR2RGB)

e1 = face_recognition.face_encodings(imgP1)[0]
e2 = face_recognition.face_encodings(imgP2)[0]

fP1 = face_recognition.face_locations(imgP1)[0]
fP2 = face_recognition.face_locations(imgP2)[0]

cv2.rectangle(imgP1,(fP1[3],fP1[0]),(fP1[1],fP1[2]),(255,0,255),2)
cv2.rectangle(imgP2,(fP2[3],fP2[0]),(fP2[1],fP2[2]),(255,0,255),2)

results = face_recognition.compare_faces([e1],e2)
distance = face_recognition.face_distance([e1],e2)
print(results,distance)

# cv2.imshow("Me",imgP1)
# cv2.imshow("fP2",imgP2)

# cv2.waitKey(0)
print("ok") 

# def decode_base64_image(base64_string):
#     # Extract the image data from the Base64 string and decode it
#     image_data = base64.b64decode(base64_string.split(",")[1])
#     image_path = os.path.join(IMAGES_PATH, "user.jpg")
#     with open(image_path, "wb") as f:
#         f.write(image_data)
#     # Convert the binary image data into a numpy array
#     # image_array = np.frombuffer(image_data, dtype=np.uint8)
#     # Decode the numpy array to an OpenCV image format
#     # image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
#     # return image
#     return image_path

# def detect_faces(image):
#     # Convert the image to grayscale for face detection
#     gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

#     # Load a pre-trained Haar Cascade Classifier for face detection
#     face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

#     # Detect faces in the image
#     face_locations = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

#     for (x, y, w, h) in face_locations:
#         cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)
#     image_with_faces_filename = "detect.jpg"
#     image_with_faces_path = os.path.join(LABELLED_IMAGES_PATH, image_with_faces_filename)
#     cv2.imwrite(image_with_faces_path, image)

#     return face_locations.tolist()
#     # return face_locations

# def save_image_with_faces(image_data, image_filename):
#     try:
#         # Decode the Base64 data to binary
#         image_data = base64.b64decode(image_data.split(",")[1])
        
#         # Save the image to the "/images" folder
#         image_path = os.path.join(IMAGES_PATH, image_filename)
#         with open(image_path, "wb") as f:
#             f.write(image_data)
        
#         # Convert the binary data to a NumPy array
#         nparr = np.frombuffer(image_data, np.uint8)
        
#         # Decode the NumPy array to an OpenCV image
#         image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
#         # Perform face detection
#         gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#         faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        
#         # Draw rectangles around the detected faces
#         for (x, y, w, h) in faces:
#             cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)
        
#         # Set the path where you want to save the image with faces
#         image_with_faces_filename = "your_image_name_with_faces.jpg"  # Change "your_image_name_with_faces" to your desired filename
        
#         # Save the image with the detected faces to the "/images" folder
#         image_with_faces_path = os.path.join(LABELLED_IMAGES_PATH, image_with_faces_filename)
#         cv2.imwrite(image_with_faces_path, image)

#         return "Image with faces saved successfully!"
    
#     except Exception as e:
#         return f"Error: {str(e)}"

# def detect_faces(image_path):
#     image = face_recognition.load_image_file(image_path)
#     face_locations = face_recognition.face_locations(image)
#     return [image_path] if face_locations else []

# Endpoint to capture an image using the camera
# @app.route('/capture', methods=['POST'])
# def capture_image():
#     try:
#         # Get the Base64 encoded image from the request
#         base64_image = request.form.get("image")
        
#         # Set the path where you want to save the original image
#         image_filename = "your_image_name.jpg"  # Change "your_image_name" to your desired filename
        
#         # Save the original image to the "/images" folder
#         result = save_image_with_faces(base64_image, image_filename)
        
#         return result
    
#     except Exception as e:
#         return f"Error: {str(e)}"  

# def user_login():
#     base64_image = request.form.get("image")
#     image = decode_base64_image(base64_image)
#     detected_faces = detect_faces(image)

#     similar_users_images = []
#     for user_image in os.listdir(PARTH_FOLDER):
#         user_image_path = os.path.join(PARTH_FOLDER, user_image)
#         for user_main in detected_faces:
#             if user_image_path in user_main:
#                 similar_users_images.append(user_image_path)

#     # Remove the temporarily saved image
#     # os.remove(image_path)
#     print(similar_users_images)
#     return jsonify({"similar_users_images": similar_users_images})


@app.route('/capture', methods=['POST'])
def user():
    print("calling")
    imgP1 = face_recognition.load_image_file("parth/user.jpg")
    imgP1 = cv2.cvtColor(imgP1, cv2.COLOR_BGR2RGB)
    imgP2 = face_recognition.load_image_file("parth/IMG_6277.JPG")
    imgP2 = cv2.cvtColor(imgP2, cv2.COLOR_BGR2RGB)

    fP1 = face_recognition.face_locations(imgP1)[0]
    fP2 = face_recognition.face_locations(imgP2)[0]

    cv2.rectangle(imgP1, (fP1[3], fP1[0]), (fP1[1], fP1[2]), (255, 0, 255), 2)
    cv2.imshow("Me",imgP1)
    cv2.waitKey(0)
    print("Return")
    return []

if __name__ == '__main__':
    app.run(debug=True,port=5000)
