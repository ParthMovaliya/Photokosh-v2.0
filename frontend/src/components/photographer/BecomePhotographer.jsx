import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { sendVerificationUser } from '../../store/adminSlice';
import { Link } from "react-router-dom";

const BecomePhotographer = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { data: userData, status } = useSelector((state) => state.user);
    const [sName, setSName] = useState("");
    const [sAdd, setSAdd] = useState("");
    const [number, setNmber] = useState();

    const submitForm = (e) => {
        e.preventDefault();
        if (!userData.isAuthenticated) {
            alert.show("Please Login before Apply!!");
        } else if (number.length !== 10) {
            alert.show("Mobile number should be 10 legth long");
        } else {
            // console.log(userData.user.name, userData.user.email, sName, sAdd, number)
            dispatch(sendVerificationUser(userData.user.name, userData.user.email, sName, sAdd, number));
        }
    }

    if (userData.user?.role === undefined) {
        return (
            <>
                <div className='flex gap-4 flex-col justify-center items-center min-h-[71vh]'>
                    <b className='text-lg'>Please login before apply as photographer</b>
                    <Link to='/login' className='border border-neutral-300 py-2 px-4 rounded-md bg-white'>Login</Link>
                </div>
            </>
        )
    }

    if (userData.user.role === 'admin') {
        return (
            <>
                <div className='flex gap-4 flex-col justify-center items-center min-h-[71vh]'>
                    <b className='text-lg'>Admin can't apply</b>
                    <Link to='/' className='border border-neutral-300 py-2 px-4 rounded-md bg-white'>Home</Link>
                </div>
            </>
        )
    }
    if (userData.user.role === 'photographer') {
        return (
            <>
                <div className='flex gap-4 flex-col justify-center items-center min-h-[71vh]'>
                    <b className='text-lg'>You are Already a photographer</b>
                    <Link to='/' className='border border-neutral-300 py-2 px-4 rounded-md bg-white'>Home</Link>
                </div>
            </>
        )
    }

    if (userData.user.applied === true) {
        return (
            <>
                <div className='flex gap-4 flex-col justify-center items-center min-h-[71vh]'>
                    <b className='text-lg'>You request is under verification, Please wait for some time!!</b>
                    <Link to='/' className='border border-neutral-300 py-2 px-4 rounded-md bg-white'>Home</Link>
                </div>
            </>
        )
    }

    return (
        <div className="flex justify-center items-center">
            <div className=' w-2/6 border border-neutral-300 py-4 px-8 rounded-lg bg-white'>
                <form onSubmit={submitForm} className='flex flex-col w-full gap-6'>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="sname">Shop Name</label>
                        <input onChange={(e) => setSName(e.target.value)} required className='border border-b-neutral-300 rounded py-2 px-4' type="text" name="shop_name" id="sname" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="saddress">Shop Address</label>
                        <textarea onChange={(e) => setSAdd(e.target.value)} required className='border border-b-neutral-300 rounded py-2 px-4' name="shop_address" id="saddress" cols="30" rows="6"></textarea>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="mobilenumber">Mobile Number</label>
                        <input onChange={(e) => setNmber(e.target.value)} required className='border border-b-neutral-300 rounded py-2 px-4' type="number" name="mobile_number" id="mobilenumber" />
                    </div>
                    <button type="submit" className='border bg-green-500 text-white border-neutral-300 rounded-md font-semibold text-lg py-2 hover:bg-green-600 duration-300'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BecomePhotographer