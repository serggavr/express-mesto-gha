const router = require('express').Router();

const {
  createUser, getUsers, getUser, editUser, editUserAvatar, login,
} = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', editUser);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
