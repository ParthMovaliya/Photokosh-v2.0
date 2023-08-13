import React, { useRef } from 'react'
import axios from "axios"

const UploadImage = () => {
    // const [images, setImages] = useState(null);
    const inputRef = useRef(null);

    const upImage = async (e) => {
        e.preventDefault();
        const files = inputRef.current.files;
        const imageFiles = new FormData();
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = async () => {
                // const base64encode = reader.result.split(',')[1]; // Get base64 data
                imageFiles.append('file', file);
                imageFiles.append('base64', reader.result);
                if (i === files.length - 1) {
                    try {
                        const response = await axios.post('/add_images', imageFiles);
                        console.log(response.data);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };
    // const upImage = (e) => {
    //     e.preventDefault();
    // const files = inputRef.current.files;
    // const imageFiles = new FormData();
    // const imageFiles = [];
    // for (let i = 0; i < files.length; i++) {
    //     const file = files[i];
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         const base64encode = reader.result;
    //         imageFiles.push(file, base64encode);
    //         // if (imageFiles.length === files.length) {
    //         //     console.log(imageFiles)
    //         // }
    //     }
    //     reader.readAsDataURL(file);
    //     // console.log(reader.readAsDataURL(file))
    // }
    // for (let i = 0; i < files.length; i++) {
    //     imageFiles.append("file", files[i]);
    // }
    // console.log(imageFiles);
    //make api call here -----------------------------------------------------
    // axios.post("/add_images", { imageFiles }).then(response => response.json()).then((data) => console.log(data));
    // fetch("/add_images", {
    //     method: "POST",
    //     body: imageFiles,
    // })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data))
    //     .catch((error) => console.error("Error:", error));
    // }
    return (
        <div>
            <input
                ref={inputRef}
                type='file' multiple accept='image/*' name='images' />
            <button
                onClick={(e) => upImage(e)}
            >Submit</button>
        </div>
    )
}

export default UploadImage