from flask import Flask, request, jsonify
import cv2
import os
from flask_cors import CORS
import base64
import numpy as np
import face_recognition

from utils.uploadPhoto import addAllImages
from utils.findEncodings import findEncodingsFunction

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

IMAGES_PATH = 'F:\\7th_3\\flask_backend\\photos\\'
PATH = "parth"
images = []
path_images = []
classNames = []
number_encodingList = []
# cv2.resize()
myList = os.listdir(PATH)

# add images in images
for cl in myList:
    currImg = cv2.imread(f'{PATH}/{cl}')
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
    # print(request.data)
    files = request.get_json()  # Retrieve uploaded files

    saved_filenames = []
    for filename in files:
        # print(filename)
        image_encoded = files.get(filename)
        image_data = base64.b64decode(image_encoded)
        save_path = os.path.join(IMAGES_PATH, filename)

        with open(save_path, 'wb') as f:
            f.write(image_data)

        saved_filenames.append(filename)

    ans = jsonify({"Saved Images": saved_filenames})
    return ans

# def addAllImages():
#     print(request.data)
#     files = request.files  # Retrieve uploaded files
#     for filename, image in image_files.items():
#         image_data = image.read()  # Read the binary image data
#         # image_data = base64.b64decode(base64_image.split(",")[1])
#         base64_image = base64.b64encode(image_data.split(",")[1]).decode('utf-8')  # Convert to base64 string
#         save_path = os.path.join(IMAGES_PATH, filename)
#         with open(save_path, 'wb') as f:
#             f.write(image_data)
#     # base64_data = request.form.getlist("base64")
#     # saved_filenames = []
#     # for i, file in enumerate(files):
#     #     print(i)
#     #     filename = file.filename
#     #     base64_image = base64_data[i]
#     #     save_path = os.path.join(IMAGES_PATH, filename)
#     #     image_data = base64.b64decode(base64_image.split(",")[1])
#     #     with open(save_path, 'wb') as f:
#     #         f.write(image_data)
#     #     # saved_filenames.append(filename)

#     ans = jsonify({"Saved Images": "saved_filenames"})
#     return ans

#route that take user image and comapre with all images and return detected images name for now
@app.route('/capture', methods=['POST'])
def findAllImages():
    print("------------------------------------------------");
    paths = []
    result = []
    try:
        # Get the Base64 encoded image from the request
        image_data = request.data
        print(image_data)
        # return base64_image
        # base64_image = request.form.get("image")
        # image_filename = "your_image_name.jpg"
        # image_data = base64.b64decode(base64_image.split(",")[1])
        # image_path = os.path.join(IMAGES_PATH, image_filename)
        
        # with open(image_path, "wb") as f:
        #     f.write(image_data)
        # # print("Image save")

        # Convert the binary data to a NumPy array
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
                # print(user_face_distance)
                result.append(face_recognition.compare_faces(lists,encode_face))

        for idx, success in enumerate(result):
            if True in success:
                paths.append(myList[idx])
        # for seeing result of above zip function
        # print(result)
            # if result:
            #     image_name = images[]
            #     success_image = os.path.join(PATH, image_name)
            #     paths.append(PATH)
        ans = jsonify({"Images":paths})
        print(ans)
        print("---------------------------------------------------")
        return ans

    except Exception as e:
        print("------------------------------------------------")
        print(str(e))
        return f"Error: {str(e)}"


if __name__ == '__main__':
    app.run(debug=True,port=5000)



