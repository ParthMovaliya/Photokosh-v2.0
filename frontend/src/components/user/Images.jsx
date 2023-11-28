import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SlRefresh } from "react-icons/sl";
import { STATUSES, refreshUserImage } from '../../store/userSlice';
import Loading from '../../utils/Loading';
// import parh from "../../../../flask_backend/photos"
const Images = () => {
    const dispatch = useDispatch();
    const { data: userData, status } = useSelector((state) => state.user);

    const refresh_image = () => {
        dispatch(refreshUserImage(userData.user.email));
    }

    if (status === STATUSES.LOADING) {
        return (
            <Loading />
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
            <div className="absolute right-0 top-0 bg-white text-gray-600 p-2 rounded-full border border-gray-600 hover:shadow-lg duration-300 cursor-pointer z-10 m-2 text-lg" onClick={refresh_image}>
                <SlRefresh />
            </div>
            {userData.user.images.map((img, i) => (
                <div key={i} className="relative overflow-hidden">
                    <img
                        src={require(`../../photos/${img}`)}
                        className="object-cover w-full h-full"
                        alt={img}
                    />
                    <a
                        href={require(`../../photos/${img}`)}
                        download={img}
                        className="absolute bottom-0 right-0 m-2 bg-white text-gray-600 hover:text-gray-800 rounded-full p-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </a>
                </div>
            ))}
        </div>
    )
}

export default Images