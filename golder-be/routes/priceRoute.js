const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

router.post('/add', priceController.addPrice); // Manual price input (admin-only later)
router.get('/current', priceController.getCurrentPrice);
router.get('/history', priceController.getPriceHistory);

module.exports = router;