import React from 'react'
import { useNavigate } from 'react-router-dom';
import { LuImagePlus } from "react-icons/lu"
import { useSelector } from 'react-redux';

const AddImageIcon = () => {
    const navigate = useNavigate();
    const { data: userData, status } = useSelector((state) => state.user);
    if (userData.user?.role !== "photographer") {
        return (<></>)
    }

    return (
        <div
            className='text-2xl border border-neutral-600 p-3 bg-white rounded-full fixed bottom-8 right-8 hover:shadow-lg duration-300 cursor-pointer hover:bg-green-500 hover:border-white hover:text-white'
            // className='fixed bottom-0 right-0 m-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow'
            onClick={() => { navigate("/uploadimage") }}>
            <LuImagePlus />
        </div>
    )
}

export default AddImageIcon