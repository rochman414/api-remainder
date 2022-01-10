const router = require('express').Router();
const dRController = require('../controller/DomainRemainderController');

router.get('/', dRController.getAllDomain);
router.post('/createRemainder', dRController.createDomain);
router.get('/edit/:id', dRController.fetchEdit);
router.put('/edit/:id', dRController.editById);
router.put('/editBayar/:id', dRController.editBayar);
router.get('/delete/:id', dRController.deleteRemainder);

module.exports = router;