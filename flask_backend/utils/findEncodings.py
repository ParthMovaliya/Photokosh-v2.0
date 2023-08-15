import cv2
import face_recognition

def findEncodingsFunction(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(img)
        face_encodings = face_recognition.face_encodings(img, face_locations)
        encodeList.append(face_encodings)
    return encodeList