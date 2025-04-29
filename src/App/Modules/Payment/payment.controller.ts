import { Request, Response } from 'express';
import { paymentServices } from './payment.service';
import Razorpay from 'razorpay';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

// Create Razorpay Order Handler
const createRazorpayOrderHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise (smallest currency unit)
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// Check Payment Status Handler
const checkPaymentStatusHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await razorpay.orders.fetch(orderId);
    res.send({ status: order.status });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

export const paymentController = {
  createRazorpayOrderHandler,
  checkPaymentStatusHandler,
};
