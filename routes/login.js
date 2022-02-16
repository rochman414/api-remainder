const router = require('express').Router();
const loginController = require('../controller/LoginController');

router.post('/do_login', loginController.dologin);

module.exports = router;