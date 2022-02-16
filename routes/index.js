const router = require('express').Router();
const login = require('./login');
const users = require('./users');
const finance_remainder = require('./finance_remainder');
const domain_remainder = require('./domain_remainder');

router.use('/login', login);
router.use('/users', users);
router.use('/domain', domain_remainder);
router.use('/finance', finance_remainder);

module.exports = router;