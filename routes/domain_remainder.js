const router = require('express').Router();
const dRController = require('../controller/DomainRemainderController');
const {authentication} = require('../middleware/auth');

router.use(authentication);
router.get('/', dRController.getAllDomain);
router.post('/createReminder', dRController.createDomain);
router.get('/edit/:id', dRController.fetchEdit);
router.put('/edit/:id', dRController.editById);
router.put('/editBayar/:id', dRController.editBayar);
router.delete('/delete/:id', dRController.deleteRemainder);

module.exports = router;