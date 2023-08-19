import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { VscUnverified } from "react-icons/vsc"
import { GrUserAdmin } from "react-icons/gr"
import { useDispatch, useSelector } from 'react-redux'
import { getVerificationUser } from '../../store/adminSlice'


const AdminNavbar = () => {
    const dispatch = useDispatch();
    const { data: userData, status: userStatus } = useSelector((state) => state.user);
    const { data: photographerVerificationData, status: photographerStatus } = useSelector((state) => state.admin);
    const [menuActive, setMenuActive] = useState(false);
    const [verificationCount, setVerificationCount] = useState(0);
    useEffect(() => {
        setVerificationCount(Object.keys(photographerVerificationData).length);
    }, [photographerStatus, photographerVerificationData])
    useEffect(() => {
        dispatch(getVerificationUser());
    }, [])

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };
    return (
        <nav className="bg-white mb-8 px-12 sm:px-16 md:px-20 lg:px-24 py-4 border border-b-neutral-300">
            <div className="hidden sm:flex justify-between items-center">
                <Link className="text-2xl font-bold flex gap-2 items-center" to='/'><GrUserAdmin /> Photokosh</Link>
                <div className="flex gap-4 items-center">
                    <Link to='/images'>Images</Link>
                    <Link to='/uploadimage'>Upload-Image</Link>
                    <Link to='/photographer-verification'>
                        <div className="relative text-xl border border-neutral-300 p-1 rounded-full">
                            {
                                verificationCount > 0 ?
                                    <div className="absolute text-xs text-white font-semibold bottom-4 left-5 bg-red-500 rounded-full px-1 ">{verificationCount}</div> :
                                    <div className="absolute text-xs text-white font-semibold bottom-4 left-5 bg-green-500 rounded-full px-1 ">{verificationCount}</div>
                            }
                            <VscUnverified />
                        </div>
                    </Link>
                    <Link to='/me' >
                        <img src={userData.user.image} className='rounded-full w-12 aspect-square object-cover' alt='my_image' />
                    </Link>
                </div>
            </div>
            <div className="sm:hidden flex justify-between items-center">
                <Link className="text-xl font-bold flex gap-2 items-center" to='/'><GrUserAdmin /> Photokosh</Link>
                <div onClick={() => toggleMenu()} className="">
                    <img src={userData.user.image} className='rounded-full w-10 aspect-square object-cover' alt='my_image' />
                </div>
            </div>
            <div className={`${menuActive ? "relative flex flex-col duration-100 translate-y-0" : "absolute -translate-y-96"}`}>
                <hr className='border border-t-neutral-300 flex-grow mt-2' />
                <Link to='/images'>Images</Link>
                <Link to='/uploadimage'>Upload Image</Link>
                <Link to='/photographer-verification' className='relative'>
                    {
                        verificationCount > 0 ?
                            <div className="absolute text-xs text-white font-semibold bottom-4 left-44 bg-red-500 rounded-full px-1 ">{verificationCount}</div> :
                            <div className="absolute text-xs text-white font-semibold bottom-4 left-44 bg-green-500 rounded-full px-1 ">{verificationCount}</div>
                    }
                    Photographer Verification</Link>
                <Link to='/me'>About</Link>
            </div>
        </nav>
    )
}

export default AdminNavbar