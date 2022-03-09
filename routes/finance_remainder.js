const router = require('express').Router();
const fRController = require('../controller/FinanceRemainderController');
const {authentication} = require('../middleware/auth');

router.use(authentication)
router.get('/', fRController.getAllFinance);
router.post('/createReminder', fRController.createFinance);
router.get('/edit/:id', fRController.fetchEdit);
router.put('/edit/:id', fRController.editById);
router.put('/editBayar/:id', fRController.editBayar);
router.delete('/delete/:id', fRController.deleteRemainder);

module.exports = router;