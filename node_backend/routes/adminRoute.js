const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { registerPhotographer, getAllPhotographer, verifyPhotographer } = require("../controllers/photographerrController");

const router = express.Router();

router.route("/getall-photographer").get(isAuthenticatedUser, getAllPhotographer);

router.route("/register-photographer").post(isAuthenticatedUser, registerPhotographer);

router.route("/verify-photographer").put(isAuthenticatedUser, verifyPhotographer);

module.exports = router;