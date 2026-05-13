const mongoose = require("mongoose");
const dotenv = require("dotenv"); 


async function dbConnect() {
    try {
        const url = process.env.MONGODB_URL;
        console.log("Connecting to:", url.replace(/:([^@]+)@/, ":****@"));
        console.log("URL Length:", url.length);
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}
module.exports = dbConnect;