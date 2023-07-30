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
PATH = "parth"
images = []
path_images = []
classNames = []
number_encodingList = []
# cv2.resize()
myList = os.listdir(PATH)

# add images in images
for cl in myList:
    # print(cl)
    currImg = cv2.imread(f'{PATH}/{cl}')
    images.append(currImg)
    # path_images.append()
    classNames.append(os.path.splitext(cl)[0])

# function that retuen arry of face_recognition.face_encodings which we compare with user in future
def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)

        # face_locations = face_recognition.face_locations(img)
        # no = len(face_locations)
        # print("Number of faces detected: ", no)

        imgEncry = face_recognition.face_encodings(img)
        # print(len(imgEncry))
        # print("imgEncry",imgEncry)
        # imgEnc = face_recognition.face_encodings(img)
        encodeList.append(imgEncry)
    return encodeList

encodeList = findEncodings(images)

# finding length of face detected in single image in encodeList
for lists in encodeList:
    number_encodingList.append(len(lists))

# print(number_encodingList)
# print("encodeList",encodeList)
print("Encoding Done")

#route that take user image and comapre with all images and return detected images name for now
@app.route('/capture', methods=['POST'])
def findAllImages():
    paths = []
    result = []
    try:
        # Get the Base64 encoded image from the request
        base64_image = request.form.get("image")

        image_filename = "your_image_name.jpg"

        image_data = base64.b64decode(base64_image.split(",")[1])

        image_path = os.path.join(IMAGES_PATH, image_filename)

        with open(image_path, "wb") as f:
            f.write(image_data)
        # print("Image save")

        # Convert the binary data to a NumPy array
        nparr = np.frombuffer(image_data, np.uint8)
        
        # Decode the NumPy array to an OpenCV image
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        user_image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)

        user_face = face_recognition.face_locations(user_image)
        encode_user_face = face_recognition.face_encodings(user_image,user_face)
        # print("encode_user_face done")

        # make zip of encode_user_face and user_face and then run other for loop which contain images encoding and compare with user image
        for encode_face,face_location in zip(encode_user_face,user_face):
            for lists in encodeList:
                user_matches = face_recognition.compare_faces(lists,encode_face)
                user_face_distance = face_recognition.face_distance(lists,encode_face)
                # print(user_face_distance)
                result.append(face_recognition.compare_faces(lists,encode_face))

        start = 0
        for success in result:
            if True in success:
                # print(myList[start])
                paths.append(myList[start])
            start += 1
        # for seeing result of above zip function
        # print(result)
            # if result:
            #     image_name = images[]
            #     success_image = os.path.join(PATH, image_name)
            #     paths.append(PATH)
        ans = jsonify({"Images":paths})
        return ans

    except Exception as e:
        print(str(e))
        return f"Error: {str(e)}"


if __name__ == '__main__':
    app.run(debug=True,port=5000)



