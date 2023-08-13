const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
var cors = require('cors')
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1024kb' }));
app.use(fileupload());

//Route import
const user = require("./routes/userRoute");

app.use("/api/v1", user);

app.use(errorMiddleware);

module.exports = app;