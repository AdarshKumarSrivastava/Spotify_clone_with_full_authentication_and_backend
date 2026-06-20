const express = require("express");
const { registerUser, loginUser, logoutUser, refreshAccessToken } = require("../controllers/auth.controllers");
const { verifyJWT } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Secured Routes
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);

module.exports = router;