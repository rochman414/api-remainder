const router = require('express').Router();
const UsersController = require('../controller/UsersController');
const UserController = require('../controller/UsersController');

router.get('/getdata', UserController.fetchAll);
router.post('/add', UserController.addUsers);
router.get('/edit/:id', UserController.fetchEdit);
router.put('/edit/:id', UserController.editById);
router.get('/delete/:id', UsersController.deleteById);

router.post('/login', UserController.dologin);

module.exports = router;