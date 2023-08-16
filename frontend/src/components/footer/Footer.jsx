import React from 'react'
import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <div className='bg-white mt-8 border border-t-neutral-300 flex flex-col sm:flex-row gap-2 px-12 sm:px-16 md:px-20 lg:px-24 py-4 items-center justify-center sm:justify-between'>
            <Link to='/' className="">Photokosh</Link>
            <div className="">all copyrights reserved</div>
            <div className="">
                <Link to="/contact" className="">Contact Us</Link>
            </div>
        </div>
    )
}

export default Footer