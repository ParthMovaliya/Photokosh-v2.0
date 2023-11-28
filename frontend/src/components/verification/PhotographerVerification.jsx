import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getVerificationUser, verifyPhotographer } from '../../store/adminSlice';
import { STATUSES } from '../../store/userSlice';
import Loading from '../../utils/Loading';
import { Link } from 'react-router-dom';

const PhotographerVerification = () => {
    const { data: verificationData, status } = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const verifyPhotographerfunc = (e, name, email) => {
        e.preventDefault();
        dispatch(verifyPhotographer(name, email));
        dispatch(getVerificationUser());
    }

    if (status === STATUSES.LOADING) {
        return (
            <Loading />
        )
    }

    if (verificationData.length === 0) {
        return (
            <>
                <div className='flex gap-4 flex-col justify-center items-center min-h-[71vh]'>
                    <b className='text-lg'>Threr is no current verification request</b>
                    <Link to='/' className='border border-neutral-300 py-2 px-4 rounded-md bg-white'>Home</Link>
                </div>
            </>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                verificationData.map((verification, i) => (
                    <div key={i} className='bg-white border gap-1 flex flex-col border-neutral-300 rounded my-2 p-4'>
                        <div className="flex gap-2">Name:
                            <div className="bg-yellow-200 px-1">{verification.name}</div>
                        </div>
                        <div className="flex gap-2">Email:
                            <div className="bg-yellow-200 px-1">{verification.email}</div>
                        </div>
                        <div className="flex gap-2">Shop Name:
                            <div className="bg-yellow-200 px-1">{verification.shopName}</div>
                        </div>
                        <div className="flex gap-2"> Shop Address:
                            <div className="bg-yellow-200 px-1">{verification.shopAddress}</div>
                        </div>
                        <div className="flex gap-2">Mobile Number:
                            <div className="bg-yellow-200 px-1">{verification.mobileNumber}</div>
                        </div>
                        <button className='bg-green-500 py-1 rounded mt-3 text-white hover:bg-green-600 duration-300' onClick={(e) => verifyPhotographerfunc(e, verification.name, verification.email)}>Authenticate</button>
                    </div>
                ))
            }
        </div>
    )
}

export default PhotographerVerification