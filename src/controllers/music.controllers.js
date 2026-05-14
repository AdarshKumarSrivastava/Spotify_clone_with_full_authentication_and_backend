const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {
    const { file, title } = req.body;
    const result = await uploadFile(file.buffer.toString("base64"), file.originalname);
    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id,
    });
    return res.status(201).json({
        message: "Music created successfully",
        music: {
            id: music.id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    });


}
async function createAlbum(req, res) {
    const { title, musicIds } = req.body;
    const album = await albumModel.create({
        title,
        music: musicIds,
        artist: decoded.id,
    });
    return res.status(201).json({
        message: "Album created successfully",
        album: {
            id: album.id,
            title: album.title,
            music: album.music,
            artist: album.artist
        }
    });
}

module.exports = { createMusic, createAlbum };