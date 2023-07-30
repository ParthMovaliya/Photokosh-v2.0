import React, { useRef } from 'react'

const UploadImage = () => {
    // const [images, setImages] = useState(null);
    const inputRef = useRef(null);
    const upImage = (e) => {
        e.preventDefault();
        // console.log("done")
        const files = inputRef.current.files;
        // console.log(files);
        const imageFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64encode = reader.result;
                imageFiles.push(file, base64encode);
                // console.log(base64encode)
                // if (imageFiles.length === files.length) {
                //     console.log(imageFiles)
                // }
            }
            reader.readAsDataURL(file);
            // console.log(reader.readAsDataURL(file))
        }
        //make api call here -----------------------------------------------------
        console.log(imageFiles)
    }
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