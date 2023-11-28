import React from 'react'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-[80vh] flex-col">
            <div className='border-b-8 border-e-0 border-s-8 animate-bounce border-neutral-500 rounded-full p-8 inline-flex '>
                <div className="border-e-0 border-r-8 border-b-8 rounded-full border-neutral-500 p-6 inline-flex animate-spin"></div>
            </div>
            <hr className='border border-neutral-300 w-8/12 sm:w-3/12 md:w-3/12 lg:w-3/12' />
            <div className="text-neutral-600">Loading...</div>
        </div>
    )
}

export default Loading