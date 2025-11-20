import express, { Router } from "express";
import { addProduct } from "../controllers/sellerController.js";
import { roleChecker } from "../middlewares/authMiddleware.js";
import { tokenDecoder } from "../middlewares/tokenMiddleware.js";


const sellerRoutes = Router();

sellerRoutes.post("/add-product", roleChecker, addProduct);

export default sellerRoutes;
