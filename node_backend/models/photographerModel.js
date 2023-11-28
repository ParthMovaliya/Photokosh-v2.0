const mongoose = require("mongoose");
const validator = require("validator");

const photographerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please enter your name"],
        maxLength: [30, "Your name cannot exceed 30 character"],
        minLength: [4, "Your name should have more than 4 character"],
    },
    email: {
        type: String,
        require: [true, "Please enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    shopName: {
        type: String,
        require: [true, "Please enter your shop name"],
    },
    shopAddress: {
        type: String,
        require: [true, "Please enter your shop address"],
    },
    mobileNumber: {
        type: Number,
        unique: true,
        require: [true, "Please enter your mobile Number"],
        maxLength: [10, "Your number cannot exceed 10 number"],
        minLength: [10, "Your number should have 10 number"],
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("photographer", photographerSchema);