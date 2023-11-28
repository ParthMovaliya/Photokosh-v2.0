from flask import Flask, request, jsonify
import cv2
import os
from flask_cors import CORS
import base64
import numpy as np
import face_recognition

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 * 1024


IMAGES_PATH = 'F:\\7th_3\\frontend\\src\\photos\\'
images = []
path_images = []
classNames = []
number_encodingList = []
myList = os.listdir(IMAGES_PATH)

# add images in images
for cl in myList:
    currImg = cv2.imread(f'{IMAGES_PATH}/{cl}')
    images.append(currImg)
    classNames.append(os.path.splitext(cl)[0])

# function that retuen arry of face_recognition.face_encodings which we compare with user in future
def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(img)
        face_encodings = face_recognition.face_encodings(img, face_locations)
        encodeList.append(face_encodings)
    return encodeList
encodeList = findEncodings(images)

# finding length of face detected in single image in encodeList
# for lists in encodeList:
#     number_encodingList.append(len(lists))
    
print("Encoding Done")

# taking all input images
@app.route('/add_images', methods=['POST'])
def addAllImages():
    files = request.get_json() #array of image name
    saved_filenames = []

    for filename in files:
        myList.append(filename)
        currImg = cv2.imread(f'{IMAGES_PATH}/{filename}')
        img = cv2.cvtColor(currImg, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(img)
        face_encodings = face_recognition.face_encodings(img, face_locations)
        encodeList.append(face_encodings)
        saved_filenames.append(filename)

    print("-----------------Add image done-----------------")
    ans = jsonify({"Saved Images": saved_filenames})
    return ans

#route that take user image and comapre with all images and return detected images name for now
@app.route('/capture', methods=['POST'])
def findAllImages():
    paths = []
    result = []
    answer = []
    try:
        # Get the Base64 encoded image from the request
        files = request.get_json()
        for filename in files:
            image_encoded = files.get(filename)
            image_data = base64.b64decode(image_encoded)

            nparr = np.frombuffer(image_data, np.uint8)
        
            # Decode the NumPy array to an OpenCV image
            image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            user_image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
            user_face = face_recognition.face_locations(user_image)
            encode_user_face = face_recognition.face_encodings(user_image,user_face)
            print("encode_user_face done")

            # make zip of encode_user_face and user_face and then run other for loop which contain images encoding and compare with user image
            for encode_face,face_location in zip(encode_user_face,user_face):
                for lists in encodeList:
                    user_matches = face_recognition.compare_faces(lists,encode_face)
                    user_face_distance = face_recognition.face_distance(lists,encode_face)
                    result.append(user_matches)
            
            for idx, success in enumerate(result):
                if True in success:
                    answer.append(myList[idx])
        return answer

    except Exception as e:
        print("-----------------Error-------------------------------")
        print(str(e))
        return f"Error: {str(e)}"


if __name__ == '__main__':
    app.run(debug=True,port=5000)



