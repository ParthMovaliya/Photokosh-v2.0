import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { defaultUserLogin } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMenu } from "react-icons/ai"
import LogoutNavbar from './LogoutNavbar';
import AdminNavbar from './AdminNavbar';

const Navbar = () => {
    const dispatch = useDispatch();
    const { data: userData, status } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(defaultUserLogin());
    }, []);

    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };
    // ------------------------------------------------------------------------
    if (!userData.isAuthenticated) {
        return (
            <nav className="bg-white mb-8 px-12 sm:px-16 md:px-20 lg:px-24 py-4 border border-b-neutral-300">
                <div className="hidden sm:flex justify-between items-center">
                    <Link className="text-2xl font-bold" to='/'>Photokosh</Link>
                    <div className="flex gap-4">
                        <Link to='/login'>Login</Link>
                        <Link to='/registration' >Register</Link>
                    </div>
                </div>
                <div className="sm:hidden flex justify-between items-center">
                    <Link className="text-2xl font-bold" to='/'>Photokosh</Link>
                    <div onClick={() => toggleMenu()} className="border border-neutral-500 p-1 text-xl">
                        <AiOutlineMenu />
                    </div>
                </div>
                <div className={`${menuActive ? "relative flex flex-col duration-100 translate-y-0" : "absolute -translate-y-96"}`}>
                    <hr className='border border-t-neutral-300 flex-grow mt-2' />
                    <Link to='/login' onClick={toggleMenu}>Login</Link>
                    <Link to='/registration' onClick={toggleMenu}>Register</Link>
                </div>
            </nav>

        )
    }
    // ------------------------------------------------------------------------
    if (userData.isAuthenticated) {
        if (userData.user.role === 'user') {
            return (
                <nav className="bg-white mb-8 px-12 sm:px-16 md:px-20 lg:px-24 py-4 border border-b-neutral-300">
                    <div className="hidden sm:flex justify-between items-center">
                        <Link className="text-2xl font-bold" to='/'>Photokosh</Link>
                        <div className="flex gap-4 items-center">
                            <Link to='/images'>Images</Link>
                            <Link to='/me' >
                                <img src={userData.user.image} className='rounded-full w-12 aspect-square object-cover' alt='my_image' />
                            </Link>
                        </div>
                    </div>
                    <div className="sm:hidden flex justify-between items-center">
                        <Link className="text-2xl font-bold" to='/'>Photokosh</Link>
                        <div onClick={() => toggleMenu()} className="">
                            <img src={userData.user.image} className='rounded-full w-12 aspect-square object-cover' alt='my_image' />
                        </div>
                    </div>
                    <div className={`${menuActive ? "relative flex flex-col duration-100 translate-y-0" : "absolute -translate-y-96"}`}>
                        <hr className='border border-t-neutral-300 flex-grow mt-2' />
                        <Link to='/images'>Images</Link>
                        <Link to='/me'>About</Link>
                    </div>
                </nav>
            )
        }
        if (userData.user.role === 'photographer') {
            return (
                <nav className="bg-white mb-8 px-12 sm:px-16 md:px-20 lg:px-24 py-4 border border-b-neutral-300">
                    <div className="hidden sm:flex justify-between items-center">
                        <Link className="text-2xl font-bold" to='/'>Photokosh</Link>
                        <div className="flex gap-4 items-center">
                            <Link to='/images'>Images</Link>
                            <Link to='/uploadimage'>Upload-Image</Link>
                            <Link to='/me' >
                                <img src={userData.user.image} className='rounded-full w-12 aspect-square object-cover' alt='my_image' />
                            </Link>
                        </div>
                    </div>
                    <div className="sm:hidden flex justify-between items-center">
                        <Link className="text-2xl font-bold" to='/'>Photokosh</Link>
                        <div onClick={() => toggleMenu()} className="">
                            <img src={userData.user.image} className='rounded-full w-12 aspect-square object-cover' alt='my_image' />
                        </div>
                    </div>
                    <div className={`${menuActive ? "relative flex flex-col duration-100 translate-y-0" : "absolute -translate-y-96"}`}>
                        <hr className='border border-t-neutral-300 flex-grow mt-2' />
                        <Link to='/images'>Images</Link>
                        <Link to='/uploadimage'>Upload-Image</Link>
                        <Link to='/me'>About</Link>
                    </div>
                </nav>
            )
        }
        if (userData.user.role === 'admin') {
            return (
                <AdminNavbar />
            )
        }
    }
}

export default Navbar