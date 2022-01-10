const router = require('express').Router();
const fRController = require('../controller/FinanceRemainderController');

router.get('/', fRController.getAllFinance);
router.post('/createRemainder', fRController.createFinance);
router.get('/edit/:id', fRController.fetchEdit);
router.put('/edit/:id', fRController.editById);
router.put('/editBayar/:id', fRController.editBayar);
router.get('/delete/:id', fRController.deleteRemainder);

module.exports = router;