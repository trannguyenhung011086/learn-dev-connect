const crypto = require("crypto");
const axios = require("axios").default;

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
  },

  async genAvatar({ email, size = 200 }) {
    const hash = crypto
      .createHash("md5")
      .update(email)
      .digest("hex");
    return await axios
      .get(`https://www.gravatar.com/${hash}.json`)
      .then(res => res.data.entry[0].thumbnailUrl + `?s=${size}`)
      .catch(err => {
        console.error(`Error with gravatar: ` + err.message);
        return `https://www.gravatar.com/avatar/${hash}?s=${size}`;
      });
  }
};
