const catchAsyncError = require("../middleware/catchAsyncError");
const Photographer = require("../models/photographerModel");
const User = require("../models/userModel");
const axios = require("axios");

exports.registerPhotographer = catchAsyncError(async (req, res, next) => {
    const { name, email, shopName, shopAddress, mobileNumber } = req.body;
    const user = await Photographer.create({
        name,
        email,
        shopName,
        shopAddress,
        mobileNumber
    });
    res.status(201).json({
        success: true,
        user
    });
});

exports.getAllPhotographer = catchAsyncError(async (req, res, next) => {
    const vUsers = await Photographer.find({ isAuthenticated: false });
    res.status(200).json({
        success: true,
        vUsers
    });
});

exports.verifyPhotographer = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;
    await Photographer.updateOne({ name, email }, { $set: { isAuthenticated: true } });
    const updateUser = await User.updateOne({ name, email }, { $set: { role: 'photographer' } });
    // console.log(updateUser)
});

exports.uploadImagesByPhotographer = catchAsyncError(async (req, res, next) => {
    const images = req.body;
    // console.log(images)
    // images.map((image) => (
    //     console.log(image)
    // ))
    // const imageFiles = req.files.map(file => file.buffer.toString('base64'));
    // console.log(images);
    axios.post("http://127.0.0.1:5000/add_images", images)
        .then(response => console.log("-------------------------------------------------------", response.data))
        .catch(err => console.log(err))
});