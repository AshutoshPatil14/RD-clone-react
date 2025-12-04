import express from 'express';
import { createOrder, getOrders, getSellerOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder);

orderRouter.get("/get-orders/:userId", getOrders);

orderRouter.post("/get-seller-orders", getSellerOrders);


export default orderRouter;