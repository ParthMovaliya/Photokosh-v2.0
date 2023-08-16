import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
    const { data: userData, status } = useSelector((state) => state.user);
    return (
        <div>
            <p>
                <span className='font-semibold text-lg'>Welcome, {userData.isAuthenticated ? `${userData.user.name}` : "User"}!</span>
            </p>

            <hr className='border border-b-neutral-300' />
            <div className="py-2">
                <p className='text-lg font-semibold'>Become a Photographer</p>
                <ul className='list-disc list-inside'>
                    <b>Why join us?</b>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
                <div className="my-5 flex justify-center items-center">
                    <Link to='/become-photographer' className='border bg-white border-neutral-300 py-2 px-4 rounded'>Become a Photographer</Link>
                </div>
            </div>
            <hr className='border border-b-neutral-300' />
        </div>
    )
}

export default Home