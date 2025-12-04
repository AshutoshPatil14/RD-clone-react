import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/create-order", createOrder);


export default orderRouter;