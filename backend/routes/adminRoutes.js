import express from "express";
import { getAllUsers, getAllProducts, getAllOrders } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/users", getAllUsers);
adminRouter.get("/products", getAllProducts);
adminRouter.get("/orders", getAllOrders);

export default adminRouter;
