const express = require("express");
const graphqlHTTP = require("express-graphql");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const errorsHandler = require("./controllers/errors.handler");
const schema = require("./graphql");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", require("./routes/index.route"));
app.use("/users", require("./routes/user.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/profiles", require("./routes/profile.route"));
app.use("/posts", require("./routes/post.route"));

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.use("*", errorsHandler.notFound);
app.use(errorsHandler.process);

module.exports = app;
