const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const router = require('./routes/users');
// const { createUser } = require('./controllers/users');


const {
  PORT = 3000,
} = process.env;

// const {
//   createUser,
// } = require('./controllers/users');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '62ff375e1fe9c212ae07ff8f',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
// app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
