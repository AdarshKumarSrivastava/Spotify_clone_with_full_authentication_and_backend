const cloudinary = require("../config/cloudinary");

const uploadOnCloudinary = async (fileBuffer, folder, resourceType = "auto") => {
    return new Promise((resolve, reject) => {
        if (!fileBuffer) return reject(new Error("File buffer is required"));

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        uploadStream.end(fileBuffer);
    });
};

module.exports = { uploadOnCloudinary };
