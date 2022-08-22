module.exports = class ServerError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Произошла ошибка';
    this.statusCode = 500;
  }
};
