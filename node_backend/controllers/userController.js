const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");

//register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const myCloud = await cloudinary.uploader.upload(req.body.user_image, {
        folder: "photokosh",
        width: 150,
        crop: "scale"
    });
    const { name, email, password, user_image } = req.body;
    const new_user_image = user_image.split(",");
    const imageBuffer = Buffer.from(new_user_image[1], 'base64');
    axios.post("http://127.0.0.1:5000/capture", { imageBuffer })
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
    const user = await User.create({
        name,
        email,
        password,
        user_image,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });
    sendToken(user, 201, res);
});

//login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.cookie.token)
    if (!email || !password) {
        return next(new ErrorHandler("Please Provide Email and Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("User not found", 401));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email and Password", 401));
    }
    sendToken(user, 200, res);
});

//logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Loged Out!",
    });
});

//get user details - Me
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
})

//Get all user data -- Admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
});

//delete user -- Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User dosen't Exist with id: ${user.params.id}`, 503));
    }
    await User.deleteOne();
    res.status(200).json({
        success: true,
        message: "user deleted Successful"
    });
});

//forget password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not Found", 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordURL = `${process.env.FRONTEND_URI}/password/reset/${resetToken}`;
    const message1 = `Your password reset token is:- \n\n ${resetPasswordURL} \n\n If ypu not Requested this email then Please ignore it`;
    try {
        await sendEmail({
            email: user.email,
            subject: `Clone Password Recovery`,
            message: message1,
        });
        res.status(200).json({
            success: true,
            Message: `email sent to ${user.email} successfully`,
        })
    } catch (err) {
        // console.log("error forgotPassword")
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(err.message, 500));
    }
});

//reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }
    if (!user || user.resetPasswordExpire < Date.now()) {
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 404));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password and confirm password dosen't match", 404));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save()
    sendToken(user, 200, res);
});
