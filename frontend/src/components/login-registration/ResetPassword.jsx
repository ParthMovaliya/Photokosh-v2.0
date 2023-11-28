import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PopUp from '../../utils/PopUp';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES, setNewPAssword } from '../../store/userSlice';

const ResetPassword = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: userData, status } = useSelector((state) => state.user);
    const loginUserDetails = useRef(null);

    const resetPasswordFunction = (e) => {
        e.preventDefault();
        dispatch(setNewPAssword(token, loginUserDetails.current.newpassword.value, loginUserDetails.current.re_password.value));
    }

    if (status === STATUSES.LOADING) {
        return (
            <div className="flex justify-center items-center h-[80vh] flex-col">
                <div className='border-b-8 border-e-0 border-s-8 border-neutral-500 rounded-full p-8 inline-flex animate-bounce'>
                    <div className="border-e-0 border-r-8 border-b-8 border-s-8 border-neutral-500 rounded-full p-6 inline-flex animate-spin"></div>
                </div>
                <hr className='border border-neutral-300 w-8/12 sm:w-3/12 md:w-3/12 lg:w-3/12' />
                <div className="text-neutral-600">Loading...</div>
            </div>
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
                        <label htmlFor="password">New Password</label>
                        <input className='p-2 border-2 border-neutral-300 rounded-md' type="text" name='newpassword' />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="re_password">Re-Password</label>
                        <input className='p-2 border-2 border-neutral-300 rounded-md' type="text" name='re_password' />
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
            {/* {
                if(userData.message.length > 0) ? <PopUp message={userData.message} success={true} /> : ""
            } */}
        </div>
    )
}

export default ResetPassword