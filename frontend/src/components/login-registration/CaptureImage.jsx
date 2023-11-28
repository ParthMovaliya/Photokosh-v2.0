import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const CaptureImage = () => {
    const webcamRef = useRef(null);

    const captureUser = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        sendImageToBackend(imageSrc);
    };

    const sendImageToBackend = async (imageSrc) => {
        const formData = new FormData();
        formData.append("image", imageSrc);
        fetch("/capture", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error));
        // try {
        //     const response = await fetch("/capture", {
        //         method: "POST",
        //         body: formData,
        //     });
        //     // console.log(response)
        //     if (response.ok) {
        //         console.log("Image saved successfully!");
        //     } else {
        //         console.error("Failed to save the image.");
        //     }
        // } catch (error) {
        //     console.error("Error:", error);
        // }
    }

    return (
        <div className='flex justify-center items-center gap-4 flex-col h-screen '>
            <Webcam className='w-10/12 sm:w-8/12 md:w-8/12 lg:w-6/12'
                audio={false}
                height={480}
                width={640}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button className='border border-black rounded-md py-2 px-4 font-semibold' onClick={captureUser}>Capture Image</button>
        </div>
    );
};

export default CaptureImage;
