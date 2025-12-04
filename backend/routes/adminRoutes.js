import express from "express";
import { getAllUsers, getAllProducts, getAllOrders } from "../controllers/adminController.js";

const adminRoutes = express.Router();

adminRoutes.get("/users", getAllUsers);
adminRoutes.get("/products", getAllProducts);
adminRoutes.get("/orders", getAllOrders);

export default adminRoutes;
