const express = require("express");
const { uploadMusic, getAllMusic, streamMusic } = require("../controllers/music.controllers");
const { verifyJWT, verifyRole } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/multer.middleware");

const router = express.Router();

// Secured Routes
router.use(verifyJWT);

// Artist only route
router.post(
    "/upload",
    verifyRole(["artist", "admin"]),
    upload.fields([
        { name: "audio", maxCount: 1 },
        { name: "coverArt", maxCount: 1 }
    ]),
    uploadMusic
);

// General User routes
router.get("/", getAllMusic);
router.get("/stream/:id", streamMusic);

module.exports = router;
