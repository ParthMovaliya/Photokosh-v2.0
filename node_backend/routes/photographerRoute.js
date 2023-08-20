const express = require("express");
const { uploadImagesByPhotographer } = require("../controllers/photographerrController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/add_images").post(isAuthenticatedUser, uploadImagesByPhotographer);

module.exports = router;