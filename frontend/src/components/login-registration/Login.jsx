import React, { useEffect, useRef, useState } from 'react'
import { STATUSES, getUserDetails, setStatus } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Loading from '../../utils/Loading';
import { useAlert } from 'react-alert';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [showPassword, setShowPassword] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const { data: userData, status } = useSelector((state) => state.user);
    const loginUserDetails = useRef(null);

    const loginUser = async (e) => {
        e.preventDefault();
        dispatch(getUserDetails(loginUserDetails.current.email.value, loginUserDetails.current.password.value));
    }

    useEffect(() => {
        // console.log("change", userData.isAuthenticated, status)
        if (userData.isAuthenticated || (status === STATUSES.LOADING && userData.isAuthenticated)) {
            navigate("/");
        }
        if (status === STATUSES.ERROR)
            alert.show(userData.message);
    }, [status, userData]);

    if (status === STATUSES.LOADING) {
        return (
            <Loading />
        )
    }

    return (
        <div className='flex justify-center items-center min-h-[80vh] '>
            <div className="border border-neutral-300 bg-white rounded-lg p-8 sm:w-9/12 md:w-6/12 lg:w-5/12">
                <form ref={loginUserDetails} className='flex gap-4 flex-col pb-4' action="post" onSubmit={(e) => loginUser(e)} >
                    <div className="text-center text-2xl font-semibold tracking-wide">Log in to your account</div>
                    <hr className='border border-t-neutral-300' />
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input className='p-2 border-2 border-neutral-300 rounded-md' type="email" name='email' />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <div className="flex ">
                            <input className='p-2 border-2 border-r-transparent border-neutral-300 rounded-l-md flex-grow' type={showPassword ? "text" : "password"} name='password' />
                            <div onClick={() => setShowPassword(showPassword => !showPassword)} className='flex justify-center items-center px-3 cursor-pointer border-2 rounded-r-md border-neutral-300'>
                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='mt-2 tracking-wider bg-blue-600 px-2 py-3 text-lg text-white rounded-md'>Log in</button>
                    <p className='flex justify-end text-blue-600 underline cursor-pointer' onClick={() => navigate("/password/forgot")}>forgot password?</p>
                </form>
                <div className="flex items-center">
                    <hr className='flex flex-grow border border-t-neutral-300' />
                    <p className='px-2'>OR</p>
                    <hr className='flex flex-grow border border-t-neutral-300' />
                </div>
                <div className="flex justify-center items-center gap-4 mt-2">
                    <p>New to Photokosh?</p>
                    <button className='text-blue-600 underline' onClick={() => navigate("/register")}>Create an account.</button>
                </div>
            </div>
            {
                status === STATUSES.ERROR && <></>
            }
        </div>
    )
}

export default Login