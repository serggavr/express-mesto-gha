const User = require('../models/user');

module.exports.createUser = (req, res) => {
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
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => res.status(500).send({
      message: 'Произошла ошибка',
    }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Пользователь не найден' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.editUser = (req, res) => {
  const {
    name,
    about,
    owner = req.user._id,
  } = req.body;
  User.findByIdAndUpdate(owner, {
    name,
    about,
  }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.editUserAvatar = (req, res) => {
  const {
    avatar,
    owner = req.user._id,
  } = req.body;
  User.findByIdAndUpdate(owner, {
    avatar,
  }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
