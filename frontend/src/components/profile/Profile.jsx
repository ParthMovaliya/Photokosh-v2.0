import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutLoginUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: userData, status } = useSelector((state) => state.user);

    const userLogout = () => {
        navigate("/");
        dispatch(logoutLoginUser());
    }
    return (
        <div className=''>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-neutral-500 py-8 rounded-xl bg-white">
                <div className="flex justify-center items-center">
                    <img src={userData.user.image} alt="user_image" className='rounded-md aspect-square object-cover border border-neutral-300 w-3/6 cursor-pointer' />
                </div>
                <div className="lg:col-span-2 mt-4 sm:mt-0">
                    <div className="flex flex-col gap-4 sm:mt-8">
                        <div className="hidden md:flex flex-col gap-4">
                            <div className="">
                                <p className='text-xs sm:text-sm'>Name: </p>
                                <p className='sm:text-lg font-semibold text-base'>{userData.user.name}</p>
                            </div>
                            <div className="">
                                <p className='text-xs sm:text-sm'>Mail: </p>
                                <p className='sm:text-lg font-semibold text-base'>{userData.user.email}</p>
                            </div>
                            <div className="">
                                <button className='border border-black rounded-md  py-2 px-4' onClick={() => { navigate("/password/forgot") }}>ResetPassword</button>
                            </div>
                            <div className="">
                                <button className='border border-red-500 text-white bg-red-500 rounded-md py-2 px-4 ' onClick={userLogout}>Logout</button>
                            </div>
                        </div>
                        <div className="flex md:hidden flex-col gap-4 justify-center items-center">
                            <div className="flex flex-col justify-center items-center">
                                <p className='text-xs sm:text-sm'>Name: </p>
                                <p className='sm:text-lg font-semibold text-base'>{userData.user.name}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <p className='text-xs sm:text-sm'>Mail: </p>
                                <p className='sm:text-lg font-semibold text-base'>{userData.user.email}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <button className='border border-black rounded-md text-sm sm:text-lg py-2 px-4' onClick={() => { navigate("/password/forgot") }}>ResetPassword</button>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <button className='border border-red-500 text-white bg-red-500 rounded-md py-2 px-4 text-sm sm:text-lg' onClick={userLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile