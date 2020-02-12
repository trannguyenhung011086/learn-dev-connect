const config = require("./config");
const redis = require("redis");

const options = {
  hots: config.redisHost,
  port: config.redisPassword
};
if (config.redisPassword) {
  options.password = config.redisPassword;
}

const client = redis.createClient(options);

client
  .on("error", err =>
    console.error(`Error connecting with Redis: ${err.message}`)
  )
  .on("ready", () =>
    console.info(`Connected to redis: ${config.redisHost}:${config.redisPort}`)
  );

module.exports = client;
