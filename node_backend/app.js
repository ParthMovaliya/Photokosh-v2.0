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
app.use(bodyParser.urlencoded({ defer: true, extended: true }));
app.use(bodyParser.json({ limit: '16mb' }));
app.use(fileupload());

//Route import
const user = require("./routes/userRoute");
const admin = require("./routes/adminRoute");
const photographer = require("./routes/photographerRoute");

app.use("/api/v1", user);
app.use("/api/v1", admin);
app.use("/api/v1", photographer);

app.use(errorMiddleware);

module.exports = app;