import express, { Router } from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getSellerProducts,
} from "../controllers/sellerController.js";
import { roleChecker } from "../middlewares/authMiddleware.js";
import { tokenDecoder } from "../middlewares/tokenMiddleware.js";
import orderRouter from "./orderRoutes.js";

const sellerRoutes = Router();

sellerRoutes.post("/add-product", roleChecker, addProduct);
sellerRoutes.get("/products-added", tokenDecoder, getSellerProducts);

sellerRoutes.put("/edit-product/:productId", editProduct);
sellerRoutes.put("/delete-product/:productId", deleteProduct);

sellerRoutes.use("/orders", orderRouter);
export default sellerRoutes;
