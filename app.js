const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Errorhandling = require("./middleware/Error");
const router = require("./routs/Routs");
const upload = require("./multerconfig/Storageconfig");
const cookieParser = require("cookie-parser");

const app = express();

//mongo connect
mongoose
  .connect("mongodb://127.0.0.1:27017/Auth")
  .then(() => console.log("mongoconnect successfully"))
  .catch((error) => {
    console.log("error", error);
  });

//cors use
app.use(cors());
//bodyparseruse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIESECRET));

app.use(express.urlencoded({ extended: true }));

//config
dotenv.config();

//router use
app.use(router);

//Error  handling
app.use(Errorhandling);

module.exports = app;
