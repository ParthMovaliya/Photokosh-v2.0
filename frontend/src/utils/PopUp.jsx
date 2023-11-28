import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { IoCheckmarkDoneCircleOutline, IoCloseSharp } from "react-icons/io5"
import { BiErrorCircle } from "react-icons/bi"

const animation = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: -20 },
    exit: { opacity: 0, y: 0 },
}

const PopUp = ({ message, success }) => {
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 5000);
        // return clearTimeout(timeout);
    }, []);

    const hidePopup = () => {
        setShowPopup(false);
    }

    return (
        <motion.div className={showPopup ? `absolute bottom-0 flex gap-2 items-center ${success ? "bg-green-600" : "bg-red-600"} text-white py-1 px-2 rounded text-lg` : "hidden"}
            variants={animation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
        // whileHover={{ scale: 1.2 }}
        >
            <span>{success ? <IoCheckmarkDoneCircleOutline /> : <BiErrorCircle />}</span>
            <span>{message}</span>
            <button className='text-white' onClick={hidePopup}><IoCloseSharp /></button>
        </motion.div>
    )
}

export default PopUp