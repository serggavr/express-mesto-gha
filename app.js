const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  celebrate,
  Joi,
  Segments,
  errors,
} = require('celebrate');

const { auth } = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { errorHandler } = require('./middlewares/errorHandler');
const { NotFoundError } = require('./constants/errors');

const {
  PORT = 3000,
} = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
  // [Segments.BODY]: Joi.object().keys({
  //   name: Joi.string().min(2).max(30),
  //   about: Joi.string(),
  //   avatar: Joi.string(),
  //   password: Joi.string().required(),
  //   email: Joi.string().required(),
  // }),
}), createUser);

app.post('/signip', celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
  // [Segments.BODY]: Joi.object().keys({
  //   password: Joi.string().required(),
  //   email: Joi.string().required(),
  // }),
}), login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
