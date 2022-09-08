module.exports.errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message });
  next();
};
