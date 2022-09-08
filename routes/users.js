const router = require('express').Router();

const {
  getUsers, getUser, editUser, editUserAvatar, getCurrentUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUserInfo);
router.patch('/me', editUser);
router.get('/:id', getUser);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
