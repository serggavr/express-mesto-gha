const router = require('express').Router();

const {
  createUser, getUsers, getUser, editUser, editUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', editUser);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
