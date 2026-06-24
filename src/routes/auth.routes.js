const express = require("express");
const { registerUser, loginUser, logoutUser, refreshAccessToken } = require("../controllers/auth.controllers");
const { verifyJWT } = require("../middlewares/auth.middleware");
const { validateRegistration, validateLogin } = require("../middlewares/validate.middleware");

const router = express.Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", validateLogin, loginUser);

// Secured Routes
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);

module.exports = router;