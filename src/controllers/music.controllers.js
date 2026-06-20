const Song = require("../models/song.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { uploadOnCloudinary } = require("../services/cloudinary.service");
const https = require("https");

const uploadMusic = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title) {
        throw new ApiError(400, "Title is required");
    }

    const audioFile = req.files?.audio?.[0];
    const coverArtFile = req.files?.coverArt?.[0];

    if (!audioFile) {
        throw new ApiError(400, "Audio file is required");
    }

    if (!coverArtFile) {
        throw new ApiError(400, "Cover art is required");
    }

    // Upload to Cloudinary
    const audioUpload = await uploadOnCloudinary(audioFile.buffer, "spotify-clone/audio", "video");
    const coverArtUpload = await uploadOnCloudinary(coverArtFile.buffer, "spotify-clone/covers", "image");

    if (!audioUpload || !coverArtUpload) {
        throw new ApiError(500, "Failed to upload files to cloud storage");
    }

    const song = await Song.create({
        title,
        artist: req.user._id,
        audioUrl: audioUpload.secure_url,
        coverArt: coverArtUpload.secure_url,
        duration: audioUpload.duration || 0
    });

    return res.status(201).json(new ApiResponse(201, song, "Music uploaded successfully"));
});

const getAllMusic = asyncHandler(async (req, res) => {
    const songs = await Song.find().populate("artist", "username profileImage").sort("-createdAt");
    return res.status(200).json(new ApiResponse(200, songs, "Music fetched successfully"));
});

const streamMusic = asyncHandler(async (req, res, next) => {
    const songId = req.params.id;
    const song = await Song.findById(songId);

    if (!song) {
        throw new ApiError(404, "Song not found");
    }

    const audioUrl = song.audioUrl;
    const range = req.headers.range;

    const options = {
        headers: {}
    };

    if (range) {
        options.headers["Range"] = range;
    }

    https.get(audioUrl, options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    }).on("error", (err) => {
        next(new ApiError(500, "Error streaming audio proxy: " + err.message));
    });
});

module.exports = { uploadMusic, getAllMusic, streamMusic };