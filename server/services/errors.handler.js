module.exports = {
  process(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    const error = {
      status: err.status || 500,
      message: err.message || err.reason || "Error with server"
    };

    if (process.env.NODE_ENV === "development") {
      error.stack = err.stack;
    }

    if (err.name === "ValidationError") {
      error.message = [];
      Object.keys(err.errors).forEach(errorName =>
        error.message.push(err.errors[errorName].message)
      );
    }
    if (err.name === "CastError") {
      const value = err.message.match(/(value.+)( at)/)[1];
      error.message = `${value} is not a valid ObjectId`;
    }
    if (
      (err.name === "MongoError" && err.code === 11000) ||
      err.code === 11001
    ) {
      const field = err.message.match(/(index: )(.+_)/)[2].replace("_", "");
      error.message = `${field.charAt(0).toUpperCase() +
        field.slice(1)} already exists`;
    }
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      error.status = 401;
    }

    res.status(error.status).json(error);
  },

  notFound(req, res) {
    res.status(404).json({ message: "Route not found" });
  }
};
