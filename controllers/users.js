const User = require('../models/user');
const {
  ValidationError,
  ServerError,
  NotFoundError,
  CastError,
} = require('../constants/errors');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
  } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(`Переданы некорректные данные при создании пользователя. Поле${err.message.replace('user validation failed:', '').replace(':', '')}`));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => next(new ServerError('Произошла ошибка')));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return next(new NotFoundError(`Пользователь по указанному c id: ${req.params.cardId} не найден`));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Передан некорректный id пользователя'));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};

module.exports.editUser = (req, res, next) => {
  const {
    name,
    about,
    owner = req.user._id,
  } = req.body;
  User.findById(owner)
    .then((userFound) => {
      if (!userFound) {
        return next(new NotFoundError(`Пользователь c id: ${owner} не найден`));
      }
      return User.findByIdAndUpdate(owner, {
        name,
        about,
      }, { new: true, runValidators: true })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError(`Переданы некорректные данные при обновлении профиля. Поле${err.message.replace('Validation failed:', '').replace(':', '')}`));
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Передан некорректный id при обновлении профиля'));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const {
    avatar,
    owner = req.user._id,
  } = req.body;
  User.findById(owner)
    .then((userFound) => {
      if (!userFound) {
        return next(new NotFoundError(`Пользователь c id: ${owner} не найден`));
      }
      return User.findByIdAndUpdate(owner, {
        avatar,
      }, { new: true, runValidators: true })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError(`Переданы некорректные данные при обновлении профиля. Поле${err.message.replace('Validation failed:', '').replace(':', '')}`));
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Передан некорректный id при обновлении аватара'));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};
