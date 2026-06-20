const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    coverArt: {
        type: String, // Cloudinary URL
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Album", albumSchema);