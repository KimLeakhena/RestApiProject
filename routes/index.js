const express = require('express')
const router = express.Router();

router.use('/dishes', require('./dishRouter'));
router.use('/promotions', require('./promoRouter'));
router.use('/leaders', require('./leaderRouter'));
router.use('/auth', require('./auth'));

module.exports = router;