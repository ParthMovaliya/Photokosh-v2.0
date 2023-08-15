import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/home/Home';
import Login from '../components/login-registration/Login';
import Register from '../components/login-registration/Register';
import Error from '../components/error/Error';
import UserRoute from './UserRoute';
import PhotographerRoute from './PhotographerRoute';
import AdminRoute from './AdminRoute';
import Navbar from '../components/navbar/Navbar';
import ResetPassword from '../components/login-registration/ResetPassword';
import ForgetPassword from '../components/login-registration/ForgetPassword';

const MainRoute = () => {
    const { data: userData, status } = useSelector((state) => state.user);

    if (!userData.isAuthenticated) {
        return (
            <BrowserRouter>
                <Navbar />
                <div className='px-12 sm:px-16 md:px-20 lg:px-24'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/registration' element={<Register />} />
                        <Route path='/password/reset/:token' element={<ResetPassword />} />
                        <Route path='/password/forgot' element={<ForgetPassword />} />
                        <Route path='*' element={<Error />} />
                    </Routes>
                </div>
            </BrowserRouter>
        )
    } else {
        if (userData?.user?.role === "user") {
            return (
                <UserRoute />
            )
        }
        if (userData?.user?.role === "photographer") {
            return (
                <PhotographerRoute />
            )
        }
        if (userData?.user?.role === "admin") {
            return (
                <AdminRoute />
            )
        }
    }
}

export default MainRoute