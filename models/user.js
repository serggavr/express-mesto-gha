const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'обязательно для заполнения'],
    minlength: [2, 'должно содержать минимум 2 символа'],
    maxlength: [30, 'должно содержать максимум 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: [true, 'обязательно для заполнения'],
    minlength: [2, 'должно содержать минимум 2 символа'],
    maxlength: [30, 'должно содержать максимум 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: [true, 'обязательно для заполнения'],
    default: 'hhttps://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'обязательно для заполнения'],
  },
  password: {
    type: String,
    select: false,
    required: [true, 'обязательно для заполнения'],
  },
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  return {
    _id: user._id, name: user.name, about: user.about, avatar: user.avatar, email: user.email,
  };
};

module.exports = mongoose.model('user', userSchema);
