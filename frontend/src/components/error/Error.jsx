import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <div className="h-screen gap-4 flex justify-center items-center flex-col">
                <h1 className='text-9xl font-semibold'>404</h1>
                <p className='text-lg'>Opps! page not found :-/</p>
                <Link to="/" className='border border-black rounded-md py-2 px-4 font-semibold bg-white'>Go to Home page</Link>
            </div>
        </>
    )
}

export default Error