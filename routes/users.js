const router = require('express').Router();
const UserController = require('../controller/UsersController');

router.post('/add', UserController.addUsers);

module.exports = router;