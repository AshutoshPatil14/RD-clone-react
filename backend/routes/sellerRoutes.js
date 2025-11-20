import express, { Router } from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  viewProducts,
} from "../controllers/sellerController.js";
import { authMiddleware, checkRole } from "../middlewares/authMiddleware.js";

const sellerRoutes = Router();

sellerRoutes.post("/add-product", authMiddleware, checkRole(["seller"]), addProduct);

sellerRoutes.get("/view-products/:userId", viewProducts);
sellerRoutes.put("/edit-product/:productId", editProduct);
sellerRoutes.put("/delete-product/:productId", deleteProduct);

export default sellerRoutes;
