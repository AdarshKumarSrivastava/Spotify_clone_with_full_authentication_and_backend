const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
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
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album"
    },
    audioUrl: {
        type: String, // Cloudinary secure_url
        required: true
    },
    coverArt: {
        type: String, // Cloudinary secure_url
        required: true
    },
    duration: {
        type: Number, // In seconds
        required: true,
        default: 0
    },
    streams: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Song", songSchema);
