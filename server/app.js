const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const errorsHandler = require("./services/errors.handler");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", require("./routes/index.route"));
app.use("/users", require("./routes/users.route"));

app.use("*", errorsHandler.notFound);
app.use(errorsHandler.process);

module.exports = app;
