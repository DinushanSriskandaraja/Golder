const express = require('express');
const router = express.Router();
const goldController = require('../controllers/goldController');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/buy-gold', auth, goldController.buyGold);
router.post('/redeem-gold', auth, goldController.redeemGold);
router.get('/user-gold', auth, userController.getUserGold);
router.post('/update-withdraw-status', auth, goldController.updateWithdrawStatus);
router.get('/transactions', auth, goldController.getTransactions);
router.get('/withdrawal-history', auth, goldController.getWithdrawalHistory);
router.get('/pending-withdrawals', auth, goldController.getPendingWithdrawals);
module.exports = router;