const catchAsyncError = require("../middleware/catchAsyncError");
const Photographer = require("../models/photographerModel");
const User = require("../models/userModel");
const axios = require("axios");
const path = require('path');
const fs = require('fs');

//register user as photographer
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

//ger all photographer --Admin
exports.getAllPhotographer = catchAsyncError(async (req, res, next) => {
    const vUsers = await Photographer.find({ isAuthenticated: false });
    res.status(200).json({
        success: true,
        vUsers
    });
});

//verify photographer by --Admin
exports.verifyPhotographer = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;
    await Photographer.updateOne({ name, email }, { $set: { isAuthenticated: true } });
    await User.updateOne({ name, email }, { $set: { role: 'photographer', applied: true } });
});

//upload image by photographer
exports.uploadImagesByPhotographer = catchAsyncError(async (req, res, next) => {
    const images = Array.from(req.files["images"]);
    const filePath = "F:/7th_3/frontend/src/photos"
    let imgNames = [];
    // console.log(images)
    images.forEach((img) => {
        imgNames.push(img.name);
        fs.writeFile(`${filePath}/${img.name}`, img.data, (err) => {
            if (err) {
                console.error(`Error saving ${img.name}:`, err);
            }
        });
    });
    axios.post("http://127.0.0.1:5000/add_images", imgNames)
        .then(response => {
            // console.log(response.data);  // Optional: Log the response data
            res.status(200).json({
                success: true,
                message: "Image uploaded successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                success: false,
                message: "Error while uploading image"
            });
        });
});

//check user is applied for become photographer
exports.getAppliedInfo = catchAsyncError(async (req, res, next) => {
    const email = req.body.mail;

    const appliedUser = await Photographer.findOne({ email });
    let isApplied = true;
    if (appliedUser === null) {
        isApplied = false;
    }
    res.status(200).json({
        isApplied
    });
})