// import React, { useRef, useState } from 'react'
// import axios from "axios";
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useAlert } from 'react-alert';
// import { STATUSES } from '../../store/userSlice';
// import Loading from '../../utils/Loading';

// const UploadImage = () => {
//     // const [images, setImages] = useState([]);
//     const inputRef = useRef(null);
//     const navigate = useNavigate();
//     const { data: userData, status } = useSelector((state) => state.user);
//     // const [selectedFiles, setSelectedFiles] = useState([]);
//     // const alert = useAlert();
//     // const [isloading, setIsloading] = useState(false)

//     // const onFileChange = (e) => {
//     //     setSelectedFiles(Array.from(e.target.files));
//     // };

//     // const upImage = async (e) => {
//     //     e.preventDefault();
//     //     // setIsloading(true)
//     //     const images = document.getElementById("input").files;
//     //     console.log(images)
//     //     const formData = new FormData();

//     //     selectedFiles.forEach((image) => {
//     //         formData.append(image.name, JSON.stringify(image));
//     //     })
//     //     try {
//     //         console.log()
//     //         const response = await fetch('/api/v1/add_images', {
//     //             method: 'POST',
//     //             body: formData,
//     //         });
//     //         // Handle the server response as needed
//     //     } catch (error) {
//     //         console.error('Error uploading images:', error);
//     //     }
//     // };

//     if (status === STATUSES.LOADING) {
//         return (
//             <Loading />
//         )
//     }

//     if (userData.user?.role !== "photographer") {
//         navigate("/");
//     } else {
//         return (
//             <div className='flex flex-col justify-center items-center'>
//                 <div className="bg-white gap-4 p-4 flex flex-col border border-neutral-300 rounded-md">
//                     <form method='post' action='api/v1/add_images' encType="multipart/form-data">
//                         <input
//                             id='input'
//                             ref={inputRef}
//                             // onChange={onFileChange}
//                             type='file' multiple accept='image/*' name='images' />
//                         <input type='submit'></input>
//                     </form>
//                     {
//                         inputRef ?
//                             <div className='flex flex-col gap-1'>
//                                 {/* {selectedFiles.map(imageName => (
//                                     <div key={imageName}>
//                                         <div className="">{imageName}</div>
//                                     </div>
//                                 ))} */}
//                             </div> :
//                             <>no</>
//                     }
//                     {/* {isloading && <button disabled className='border rounded-md border-green-700 py-2 bg-green-300 font-bold text-gray-600 hover:shadow-lg duration-300'
//                         onClick={(e) => upImage(e)}
//                     >Wait</button>}
//                     {!isloading && <button className='border rounded-md border-green-700 py-2 bg-green-500 font-bold text-white hover:shadow-lg duration-300'
//                         onClick={(e) => upImage(e)}
//                     >Submit</button>} */}
//                 </div>
//             </div>
//         )
//     }
// }

// export default UploadImage

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Loading from '../../utils/Loading';

const UploadImage = () => {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { data: userData, status } = useSelector((state) => state.user);
    const alert = useAlert();
    const [isUploading, setIsUploading] = useState(false);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (inputRef.current.files.length === 0) {
            alert.error('Please select images before upload');
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        const images = inputRef.current.files;

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            await axios.post('/api/v1/add_images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) =>
                alert.success("Image upload successful")
            )

            setIsUploading(false);

            // inputRef.current.value = '';
        } catch (error) {
            console.error('Error uploading images:', error);
            setIsUploading(false);

            // Handle the error (e.g., show an error message)
            alert.error('Error uploading images');
        }
    };

    if (isUploading) {
        return (
            <>
                <Loading />
            </>
        );
    }

    if (userData.user?.role !== 'photographer') {
        navigate('/');
    } else {
        return (
            <div className='flex flex-col justify-center items-center'>
                <div className='bg-white gap-4 p-4 flex flex-col border border-neutral-300 rounded-md'>
                    <form onSubmit={onFormSubmit} encType='multipart/form-data'>
                        <input
                            id='input'
                            ref={inputRef}
                            type='file'
                            multiple
                            accept='image/*'
                            name='images'
                        />
                        <div className="bg-green-500 mt-4 p-2 rounded-md text-center text-lg font-semibold text-white hover:bg-green-600 hover:shadow-md duration-300">
                            <input type='submit' />
                        </div>
                    </form>
                    {isUploading && <div>Uploading...</div>}
                </div>
            </div>
        );
    }
};

export default UploadImage;
