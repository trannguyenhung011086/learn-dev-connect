require("dotenv").config({ path: "./.env" });

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/test",
  redisHost: process.env.REDIS_HOST || "127.0.0.1",
  redisPort: process.env.REDIS_PORT || "6379",
  redisPassword: process.env.REDIS_PASSWORD,
  jwtSecret: process.env.JWT_SECRET || "YOUR_JWT_SECRET",
  jwtExpire: process.env.JWT_EXPIRE || "3600000" // 1 hour
};
