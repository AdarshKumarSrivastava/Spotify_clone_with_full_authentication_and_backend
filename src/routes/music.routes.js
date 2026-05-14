const express = require("express");
const musicController = require("../controllers/music.controllers")
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
})
const router = express.Router();
router.post("/upload", upload.single("music"), authMiddleware.authArtist, musicController.createMusic);
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);


module.exports = router;
