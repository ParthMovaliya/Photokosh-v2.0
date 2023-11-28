import React, { useEffect, useRef } from 'react'
import { STATUSES, resetUserPassword } from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../utils/Loading';
import { useAlert } from 'react-alert';

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: userData, status } = useSelector((state) => state.user);
    const loginUserDetails = useRef(null);
    const alert = useAlert();

    const resetPasswordFunction = (e) => {
        e.preventDefault();
        dispatch(resetUserPassword(loginUserDetails.current.email.value));
    }

    useEffect(() => {
        if (status === STATUSES.ERROR) {
            alert.show(userData.message)
        }
    }, [userData, status])

    if (status === STATUSES.LOADING) {
        return (
            <Loading />
        )
    }

    return (
        <div className='flex justify-center items-center min-h-[80vh] '>
            <div className="border border-neutral-300 bg-white rounded-lg p-8 sm:w-9/12 md:w-6/12 lg:w-5/12">
                <form ref={loginUserDetails} className='flex gap-4 flex-col pb-4' action="post"
                    onSubmit={(e) => resetPasswordFunction(e)}
                >
                    <div className="text-center text-2xl font-semibold tracking-wide">Reset your Password</div>
                    <hr className='border border-t-neutral-300' />
                    <div className="flex flex-col">
                        <label htmlFor="email">Registered Email</label>
                        <input className='p-2 border-2 border-neutral-300 rounded-md' type="email" name='email' />
                    </div>
                    <button type="submit" className='mt-2 tracking-wider bg-blue-600 px-2 py-3 text-lg text-white rounded-md'>Log in</button>
                </form>
                <div className="flex items-center">
                    <hr className='flex flex-grow border border-t-neutral-300' />
                    <p className='px-2'>OR</p>
                    <hr className='flex flex-grow border border-t-neutral-300' />
                </div>
                <div className="flex justify-center items-center gap-4 mt-2">
                    <p>Already using  Clone?</p>
                    <button className='text-blue-600 underline' onClick={() => navigate("/login")}>Log in.</button>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword