const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../constants/errors');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }

  req.user = payload;

  next();
};
