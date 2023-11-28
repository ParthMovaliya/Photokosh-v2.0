import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { STATUSES, registerUser, setStatus } from '../../store/userSlice';
import { useAlert } from 'react-alert'
import Loading from "../../utils/Loading";
import Webcam from 'react-webcam';

const Register = () => {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [capturedImage, setCapturedImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false)
    const { data: userData, status } = useSelector((state) => state.user);
    const loginUserDetails = useRef(null);
    // const [avatarPreview, setAvatarPreview] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (userData.isAuthenticated) {
            navigate("/");
        }
        if (status === STATUSES.ERROR) {
            const allerror = userData.message.split(',');
            allerror.map(err => (
                alert.show(err)
            ))
        }
    }, [userData, status]);

    const captureUser = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    // const registerDataChange = (e) => {
    //     if (e.target.name === "avatar") {
    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             setAvatarPreview(reader.result);
    //             setAvatar(reader.result);
    //         };
    //         reader.readAsDataURL(e.target.files[0]);
    //     }
    // };

    const registerUserFunction = (e) => {
        e.preventDefault();
        if (capturedImage) {
            dispatch(registerUser(loginUserDetails.current.name.value, loginUserDetails.current.email.value, loginUserDetails.current.password.value, avatar, capturedImage));
        } else {
            alert.show('Please Click your selfie')
        }
    }

    if (status === STATUSES.LOADING) {
        return (
            <Loading />
        )
    }

    return (
        <div className='flex justify-center items-center min-h-[80vh] '>
            <div className="border border-neutral-300 bg-white rounded-lg p-8 sm:w-9/12 md:w-6/12 lg:w-5/12">
                <form ref={loginUserDetails} className='flex gap-4 flex-col pb-4' action="post"
                    onSubmit={(e) => registerUserFunction(e)}
                >
                    <div className="text-center text-2xl font-semibold tracking-wide">Create your account</div>
                    <hr className='border border-t-neutral-300' />
                    <div className="flex flex-col">
                        <label htmlFor="name">Name (min 4 character)</label>
                        <input required className='p-2 border-2 border-neutral-300 rounded-md' type="text" name='name' />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input required className='p-2 border-2 border-neutral-300 rounded-md' type="email" name='email' />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password (min 8 character)</label>
                        <div className="flex ">
                            <input required className='p-2 border-2 border-r-transparent border-neutral-300 rounded-l-md flex-grow' type={showPassword ? "text" : "password"} name='password' />
                            <div onClick={() => setShowPassword(showPassword => !showPassword)} className='flex justify-center items-center px-3 cursor-pointer border-2 rounded-r-md border-neutral-300'>
                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-4 flex-col '>
                        {capturedImage ? (
                            <div className=''>
                                <img src={capturedImage} alt="Captured Preview" />
                                <div className="flex justify-end mt-1">
                                    <button
                                        className=''
                                        onClick={() => {
                                            setCapturedImage(null);
                                        }}
                                    >
                                        Retake Image
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Webcam
                                    className=''
                                    audio={false}
                                    height={480}
                                    width={640}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                />
                                <button
                                    className='border border-black rounded-md py-2 px-4 font-semibold'
                                    onClick={() => {
                                        captureUser();
                                    }}
                                >
                                    Capture Image
                                </button>
                            </>
                        )}

                    </div>

                    <button type="submit" className='mt-2 tracking-wider bg-blue-600 px-2 py-3 text-lg text-white rounded-md'>Register</button>
                </form>

                <div className="flex items-center">
                    <hr className='flex flex-grow border border-t-neutral-300' />
                    <p className='px-2'>OR</p>
                    <hr className='flex flex-grow border border-t-neutral-300' />
                </div>
                <div className="flex justify-center items-center gap-4 mt-2">
                    <p>Already using  Photokosh?</p>
                    <button className='text-blue-600 underline' onClick={() => { (status === STATUSES.ERROR && dispatch(setStatus(STATUSES.IDLE))); navigate("/login") }}>Log in.</button>
                </div>
            </div>
        </div>
    )
}

export default Register