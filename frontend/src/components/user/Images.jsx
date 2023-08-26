import React from 'react'
import { useSelector } from 'react-redux';

const Images = () => {
    const { data: userData, status } = useSelector((state) => state.user);
    console.log(userData.user.images)
    return (
        <div>{
            userData.user.images.map(Image => (
                <div><img src={`D:/College Work/Sem-7/Project/Photokosh/Photokosh-v2.0/flask_backend/photos/${Image}`} width="500" height="600"></img>
                </div>
            ))}</div>
    )
}

export default Images