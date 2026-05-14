const ImageKit = require("imagekit");


const imagekit = new ImageKit({

    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

});

async function uploadFile(fileBuffer, fileName) {
    try {
        const response = await imagekit.upload({
            file,
            fileName: "music_" + Date.now(),
        });
        return response;
    } catch (error) {
        console.error("ImageKit upload error:", error);
        throw error;
    }
}

module.exports = { uploadFile };
