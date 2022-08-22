const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'обязательно для заполнения'],
    minlength: [2, 'должно содержать минимум 2 символа'],
    maxlength: [30, 'должно содержать максимум 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'обязательно для заполнения'],
    minlength: [2, 'должно содержать минимум 2 символа'],
    maxlength: [30, 'должно содержать максимум 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'обязательно для заполнения'],
  },
});

module.exports = mongoose.model('user', userSchema);
