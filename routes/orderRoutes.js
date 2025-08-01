const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');

router.post('/', auth, orderController.createOrder);
router.get('/my-orders', auth, orderController.getUserOrders);
router.put('/payment-status', auth, orderController.updatePaymentStatus);

module.exports = router;