const express = require("express");
const { uploadImagesByPhotographer, getAppliedInfo } = require("../controllers/photographerrController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/add_images").post(isAuthenticatedUser, uploadImagesByPhotographer);

router.route("/applied").post(isAuthenticatedUser, getAppliedInfo);

module.exports = router;