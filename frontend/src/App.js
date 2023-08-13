import React from 'react';
import './App.css';
import { Provider } from "react-redux"
import store from './store/store';
import Navbar from "./utils/Navbar"
import UploadImage from './components/photographer/UploadImage';
import Login from "./components/login-registration/Login"
import Register from "./components/login-registration/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Error from './components/error/Error';
import ResetPassword from './components/login-registration/ResetPassword';
import ForgetPassword from './components/login-registration/ForgetPassword';
import Images from './components/user/Images';
import AddImageIcon from './utils/AddImageIcon';

function App() {
  return (
    <div className='bg-[#f5f5f5] min-h-screen'>
      <div className='mx-12 sm:mx-24'>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <AddImageIcon />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/registration' element={<Register />} />
              <Route path='/uploadimage' element={<UploadImage />} />
              <Route path='/password/reset/:token' element={<ResetPassword />} />
              <Route path='/password/forgot' element={<ForgetPassword />} />
              <Route path='/images' element={<Images />} />
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
