const catchAsyncError = require("../middleware/catchAsyncError");
const Photographer = require("../models/photographerModel");
const User = require("../models/userModel");

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
    const vUsers = await Photographer.find();
    res.status(200).json({
        success: true,
        vUsers
    });
});

exports.verifyPhotographer = catchAsyncError(async (req, res, next) => {
    const { name, email } = req.body;
    const user = await User.findOne({
        name, email,
    });
    console.log(user)
})