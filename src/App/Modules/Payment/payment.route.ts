import { Router } from 'express';
import {
  paymentController
} from './payment.controller';

const router = Router();

// Razorpay Order Route
router.post('/create-razorpay-order', paymentController.createRazorpayOrderHandler);

// Check Payment Status Route
router.get('/check-payment-status/:orderId', paymentController.checkPaymentStatusHandler);

export const PaymentRoutes = router;
