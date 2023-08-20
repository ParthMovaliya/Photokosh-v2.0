import React, { useRef, useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UploadImage = () => {
    const [images, setImages] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { data: userData, status } = useSelector((state) => state.user);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const onFileChange = (e) => {
        if (!e.target.files) {
            return;
        }
        const fileArray = Array.from(e.target.files);
        const fileNames = fileArray.map(file => file.name);
        setSelectedFiles(fileNames)
    }

    // const upImage = async (e) => {
    //     e.preventDefault();
    //     const files = inputRef.current.files;
    //     const imageFiles = new FormData();
    //     for (let i = 0; i < files.length; i++) {
    //         const file = files[i];
    //         const reader = new FileReader();
    //         reader.onload = async () => {
    //             // const base64encode = reader.result.split(',')[1]; // Get base64 data
    //             imageFiles.append('file', file);
    //             // console.log(reader.result)
    //             imageFiles.append(i, reader.result);
    //             let img = reader.result;
    //             setImages([...images, img]);
    //             if (i === files.length - 1) {
    //                 try {
    //                     // console.log(images)
    //                     const response = await axios.post('/api/v1/add_images', { images, selectedFiles });
    //                     console.log(response.data);
    //                 } catch (error) {
    //                     console.error('Error:', error);
    //                 }
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    // const upImage = async (e) => {
    //     e.preventDefault();
    //     const files = inputRef.current.files;
    //     const newImages = [];
    //     for (let i = 0; i < files.length; i++) {
    //         const reader = new FileReader();
    //         const formData = new FormData();
    //         reader.onload = (e) => {
    //             newImages.push(e.target.result);

    //             if (newImages.length === files.length) {
    //                 // setImages(newImages);
    //                 formData.append("images", newImages);
    //                 console.log(formData)
    //                 try {
    //                     // console.log(newImages)
    //                     handleSubmit(formData);
    //                 } catch (error) {
    //                     console.log(error)
    //                 }
    //             }
    //         };
    //         reader.readAsDataURL(files[i]);
    //     }
    // };

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
                        console.log(response.data);
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


    const handleSubmit = async (newImages) => {
        console.log(newImages);
        try {
            const response = await axios.post('/api/v1/add_images', { newImages, selectedFiles });
        } catch (error) {
            console.log("error", error.response)
        }
        //console.log(response.data);
    }

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
    // make api call here -----------------------------------------------------
    // axios.post("/add_images", { imageFiles }).then(response => response.json()).then((data) => console.log(data));
    // fetch("/add_images", {
    //     method: "POST",
    //     body: imageFiles,
    // })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data))
    //     .catch((error) => console.error("Error:", error));
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