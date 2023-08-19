import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const PhotographerVerification = () => {
    const [vData, setVData] = useState(null);
    const { data: verificationData, status } = useSelector((state) => state.admin);

    useEffect(() => {
        setVData(Object.values(verificationData));
        // console.log(Object.values(verificationData))
    }, [verificationData, status]);

    const verifyPhotographer = (details) => {
        console.log(details)
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {vData &&
                vData.map((verification, i) => (
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
                        <button className='bg-green-400 py-1 rounded mt-3 text-white' onClick={() => verifyPhotographer(verification)}>Authenticate</button>
                    </div>
                ))
            }
        </div>
    )
}

export default PhotographerVerification