// POST   /payment/create-order

// POST   /payment/verify

// GET    /payment/history

import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';

const router=express.Router();

router.post('/create-order',createOrder)
router.post('/verify',verifyPayment)

export default router;