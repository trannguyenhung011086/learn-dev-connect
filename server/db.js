const config = require("./config");
const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose
  .connect(config.mongoUri, options)
  .catch(err => console.error(`Error connecting to database: ${err.reason}`));

const db = mongoose.connection;

db.on("error", err =>
  console.error(`Error with database connection: ${err.message}`)
)
  .on("connected", () =>
    console.info(`Connected to database ${db.host}:${db.port}/${db.name}`)
  )
  .on("disconnected", () =>
    console.info(`Disconnected to database ${db.host}:${db.port}/${db.name}`)
  );

module.exports = db;
