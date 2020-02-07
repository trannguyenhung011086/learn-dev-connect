require("dotenv").config({ path: "./.env" });

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017",
  jwtSecret: process.env.JWT_SECRET || "YOUR_JWT_SECRET"
};
