const multer = require("multer");

// We use memory storage so we can stream directly to Cloudinary without writing to disk
const storage = multer.memoryStorage();

const upload = multer({ 
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit for audio files
    }
});

module.exports = { upload };
