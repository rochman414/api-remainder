const router = require('express').Router();
const { use } = require('.');
const UsersController = require('../controller/UsersController');
const UserController = require('../controller/UsersController');
const {authentication} = require('../middleware/auth');

router.use(authentication);
router.get('/getdata', UserController.fetchAll);
router.post('/add', UserController.addUsers);
router.get('/edit/:id', UserController.fetchEdit);
router.put('/edit/:id', UserController.editById);
router.delete('/delete/:id', UsersController.deleteById);

module.exports = router;

