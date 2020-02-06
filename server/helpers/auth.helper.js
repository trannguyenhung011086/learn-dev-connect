const crypto = require("crypto");

module.exports = {
  genSalt() {
    return crypto.randomBytes(16).toString("hex");
  },

  hashPassword(password, salt) {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
  },

  verifyPassword(password, originalHash, salt) {
    const hash = this.hashPassword(password, salt);
    return hash === originalHash;
  }
};
