import base64
from flask import Flask, request, jsonify
import os

def addAllImages():
    files = request.files.getlist("file")  # Retrieve uploaded files
    base64_data = request.form.getlist("base64")
    # print("------------------------",base64_data[0])
    # print("Received files: ")
    saved_filenames = []
    for i, file in enumerate(files):
        print(i)
        filename = file.filename
        base64_image = base64_data[i]
        # Save the base64-encoded image
        save_path = os.path.join(IMAGES_PATH, filename)
        image_data = base64.b64decode(base64_image.split(",")[1])
        with open(save_path, 'wb') as f:
            f.write(image_data)
        # saved_filenames.append(filename)

    ans = jsonify({"Saved Images": "saved_filenames"})
    return ans