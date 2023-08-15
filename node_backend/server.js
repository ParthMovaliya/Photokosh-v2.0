const app = require("./app");
const dotenv = require("dotenv");
const { connectToDb } = require("./config/db")
const cloudinary = require("cloudinary").v2;

dotenv.config({ path: "config/config.env" });

//Connect to database
connectToDb();

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server run at: ${process.env.PORT}`)
});

process.on("unhandledRejection", (err) => {
    console.log(`error ${err.message}`);
    console.log("ShutDown the server Due to Unhandeled Promise Rejection");
    server.close(() => {
        process.exit(1);
    })
})