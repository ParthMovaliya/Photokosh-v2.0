import React, { useRef, useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const UploadImage = () => {
    const [images, setImages] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { data: userData, status } = useSelector((state) => state.user);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const alert = useAlert();

    const onFileChange = (e) => {
        if (!e.target.files) {
            return;
        }
        const fileArray = Array.from(e.target.files);
        const fileNames = fileArray.map(file => file.name);
        setSelectedFiles(fileNames)
    }

    const upImage = async (e) => {
        e.preventDefault();
        const files = inputRef.current.files;
        const imageFiles = new FormData();
        const imagesArray = []; // Create an array to store image data

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = async () => {
                // imageFiles.append('file', file);
                imageFiles.append(selectedFiles[i], reader.result.split(',')[1]);
                let img = reader.result;
                imagesArray.push(img); // Push image data to the array
                if (i === files.length - 1) {
                    try {
                        const response = await axios.post('/api/v1/add_images', imageFiles); // Send only FormData 
                        if (response.data.success) {
                            alert.show(response.data.message);
                        } else {
                            alert.show(response.data.message);
                        }

                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            };
            reader.readAsDataURL(file);
        }

        // Update the images state after the loop
        setImages([...images, ...imagesArray]);
    };


    // const handleSubmit = async (newImages) => {
    //     console.log(newImages);
    //     try {
    //         const response = await axios.post('/api/v1/add_images', { newImages, selectedFiles });
    //     } catch (error) {
    //         console.log("error", error.response)
    //     }
    //     //console.log(response.data);
    // }

    if (userData.user?.role !== "photographer") {
        navigate("/");
    } else {
        return (
            <div className='flex flex-col justify-center items-center'>
                <div className="bg-white gap-4 p-4 flex flex-col border border-neutral-300 rounded-md">
                    <input
                        ref={inputRef}
                        onChange={onFileChange}
                        type='file' multiple accept='image/*' name='images' />
                    {
                        inputRef ?
                            <div className='flex flex-col gap-1'>
                                {selectedFiles.map(imageName => (
                                    <div key={imageName}>
                                        <div className="">{imageName}</div>
                                    </div>
                                ))}
                            </div> :
                            <>no</>
                    }
                    <button className='border rounded-md border-green-700 py-2 bg-green-500 font-bold text-white hover:shadow-lg duration-300'
                        onClick={(e) => upImage(e)}
                    >Submit</button>
                </div>
            </div>
        )
    }
}

export default UploadImage