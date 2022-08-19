const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const {
    name,
    link,
    owner = req.user._id,
  } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        return res.status(200).send({ message: 'Карточка удалена' });
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Карточка не найдена' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  const {
    owner = req.user._id,
  } = req.body;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  const {
    owner = req.user._id,
  } = req.body;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
