const ImageKit = require("imagekit");


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "dummy_public_key",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || process.env.IMAGEKIT_PRIVATEKEY || "dummy_private_key",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/dummy",
});

async function uploadFile(fileBuffer, fileName) {
    try {
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: fileName || "music_" + Date.now(),
        });
        return response;
    } catch (error) {
        console.error("ImageKit upload error:", error);
        throw error;
    }
}

module.exports = { uploadFile };
