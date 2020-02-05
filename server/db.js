const config = require("./config");
const mongoose = require("mongoose");

mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch(err => console.error(`Error connecting to database: ${err.reason}`));

const db = mongoose.connection;

db.on("error", err =>
  console.error(`Error with database connection: ${err.message}`)
)
  .on("connected", () => console.info(`Connected to database ${db.host}`))
  .on("disconnected", () =>
    console.info(`Disconnected to database ${db.host}`)
  );

module.exports = db;
