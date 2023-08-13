import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { defaultUserLogin, logoutLoginUser } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: userData, status } = useSelector((state) => state.user);
    const userLogout = () => {
        dispatch(logoutLoginUser());
    }
    useEffect(() => {
        dispatch(defaultUserLogin());
    }, [])
    return (
        <div className='mb-4'>
            <div className="flex h-20 items-center justify-between">
                <p className='cursor-pointer font-bold text-3xl' onClick={() => navigate("/")}>Clone</p>
                <div className="flex flex-row gap-4 justify-end">
                    {userData.isAuthenticated ?
                        <>
                            {/* <p className='font-semibold text-xl'>{userData.name}</p> */}
                            <div className=""></div>
                            <img src={userData.image} alt="user_image" className='rounded-md aspect-square object-cover w-1/6 cursor-pointer' onClick={() => navigate("/me")} />
                            <button onClick={userLogout}>Logout</button>
                        </> :
                        <>
                            <button className='font-semibold text-xl' onClick={() => navigate("/login")}>Login</button>
                            <button className='font-semibold text-xl bg-blue-600 rounded text-white p-2' onClick={() => navigate("/registration")}>Get Started</button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar