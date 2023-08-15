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
        <div className='text-2xl border border-neutral-600 p-3 bg-white rounded-full absolute bottom-8 right-8' onClick={() => { navigate("/uploadimage") }}>
            <LuImagePlus />
        </div>
    )
}

export default AddImageIcon