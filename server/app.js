const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const errorsHandler = require("./controllers/errors.handler");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", require("./routes/index.route"));
app.use("/users", require("./routes/users.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/profile", require("./routes/profile.route"));

app.use("*", errorsHandler.notFound);
app.use(errorsHandler.process);

module.exports = app;
