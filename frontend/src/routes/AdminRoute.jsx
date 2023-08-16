import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../components/home/Home'
import Login from '../components/login-registration/Login'
import Register from '../components/login-registration/Register'
import UploadImage from '../components/photographer/UploadImage'
import ResetPassword from '../components/login-registration/ResetPassword'
import ForgetPassword from '../components/login-registration/ForgetPassword'
import Images from '../components/user/Images'
import Profile from '../components/profile/Profile'
import Error from '../components/error/Error'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import Contact from '../components/contact/Contact'
import BecomePhotographer from '../components/photographer/BecomePhotographer'

const AdminRoute = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className='px-12 sm:px-16 md:px-20 lg:px-24'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    {/* <Route path='/login' element={<Login />} />
                    <Route path='/registration' element={<Register />} /> */}
                    <Route path='/uploadimage' element={<UploadImage />} />
                    <Route path='/become-photographer' element={<BecomePhotographer />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/password/reset/:token' element={<ResetPassword />} />
                    <Route path='/password/forgot' element={<ForgetPassword />} />
                    <Route path='/images' element={<Images />} />
                    <Route path='/me' element={<Profile />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    )
}

export default AdminRoute