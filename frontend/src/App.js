import React from 'react';
import './App.css';
import { Provider } from "react-redux"

import store from './store/store';
import Navbar from "./utils/Navbar"
import CaptureImage from './components/login-registration/CaptureImage';
import UploadImage from './components/photographer/UploadImage';
import Login from "./components/login-registration/Login"
import Register from "./components/login-registration/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import User from './components/user/User';
import Error from './components/error/Error';
import ResetPassword from './components/login-registration/ResetPassword';
import ForgetPassword from './components/login-registration/ForgetPassword';

function App() {
  return (
    <div className='bg-[#f5f5f5] min-h-screen'>
      <div className='mx-24'>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/registration' element={<Register />} />
              <Route path='/registration-capture-image' element={<CaptureImage />} />
              <Route path='/upload-image' element={<UploadImage />} />
              <Route path='/password/reset/:token' element={<ResetPassword />} />
              <Route path='/password/forgot' element={<ForgetPassword />} />
              <Route path='/user' element={<User />} />
              <Route path='/me' element={<Profile />} />
              <Route path='*' element={<Error />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </div>
  );
}

export default App;
