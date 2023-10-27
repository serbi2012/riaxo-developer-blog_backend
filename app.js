const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const postRouter = require("./routes/post");

const mongoDBConnect = require("./config/mongoDbConnect");
const ENV_VAR = require("./config/environmentVariable");
const { notFoundError, errorHandler } = require("./config/errorHandler");

const app = express();

mongoDBConnect(ENV_VAR.DB_URI);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/post", postRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
});

app.use(notFoundError);
app.use(errorHandler);

module.exports = app;
