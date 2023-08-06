from flask import Blueprint

capture_bp = Blueprint('capture', __name__)

@capture_bp.route('/capture', methods=['POST'])
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
