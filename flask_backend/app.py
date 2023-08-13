from flask import Flask, request, jsonify
import cv2
import os
from flask_cors import CORS
import base64
import numpy as np
import face_recognition

from controllers.capture import capture_bp
from controllers.add_images import add_images_bp

from utils.findEncodings import findEncodingsFunction

IMAGES_PATH = 'F:\\7th_3\\backend\\photos\\'

app = Flask(__name__)
CORS(app)

encodeList = findEncodingsFunction(images)

print("==========----------Encoding Done----------==========")

# app.register_blueprint(user_capture_image_bp, url_prefix='/user')
app.register_blueprint(capture_bp)
app.register_blueprint(add_images_bp)

if __name__ == '__main__':
    app.run(debug=True,port=5000)