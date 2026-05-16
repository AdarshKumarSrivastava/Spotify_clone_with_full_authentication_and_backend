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
        artist: req.user.id,
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
        artist: req.user.id,
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
async function getAllMusics(req, res) {
    const musics = await (await musicModel.find().skip(1).limit(2)).populate("artist", "name");
    return res.status(200).json({
        message: "Musics fetched successfully",
        musics
    });
}
async function getAlbum(req, res) {
    const albums = await albumModel.find().populate("artist", "name").select("artist", "title");
    return res.status(200).json({
        message: "Albums fetched successfully",
        albums
    });
}
async function getAlbumById(req, res) {
    const album = await albumModel.findById(req.params.albumId).populate("artist", "name").select("artist", "title");
    return res.status(200).json({
        message: "Album fetched successfully",
        album
    });
}


module.exports = { createMusic, createAlbum, getAllMusics, getAlbum, getAlbumById };