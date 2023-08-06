from flask import Blueprint

add_images_bp = Blueprint('add_images', __name__)

@add_images_bp.route('/add_images', methods=['POST'])
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
        save_path = os.path.join(IMAGES_PATH, filename)
        image_data = base64.b64decode(base64_image.split(",")[1])
        with open(save_path, 'wb') as f:
            f.write(image_data)
        # saved_filenames.append(filename)

    ans = jsonify({"Saved Images": "saved_filenames"})
    return ans