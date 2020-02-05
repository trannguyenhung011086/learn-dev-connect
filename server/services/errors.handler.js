module.exports = {
  process(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    if (err.name === "CastError") {
      // return friendlier error message for casting
    }
    if (err.code === 11000 || err.code === 11001) {
      // return friendlier error message for duplicated field
    }
    const error = {
      status: err.status || 500,
      type: err.name || "Unknown type",
      message: err.message || err.reason || "Error with server",
      stack: process.env.NODE_ENV === "development" ? err.stack : ""
    };
    res.status(error.status).json({
      type: error.type,
      message: error.message,
      stack: error.stack
    });
  },

  notFound(req, res) {
    res.status(404).json({ message: "Not found" });
  }
};
