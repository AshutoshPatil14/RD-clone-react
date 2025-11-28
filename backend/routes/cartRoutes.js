import express from "express";
import { AddProductToCart, BuyNow, EmptyCart, GetCartProducts } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", AddProductToCart);
cartRouter.post("/buy-now", BuyNow);
cartRouter.get("/get-cart-products/:userId", GetCartProducts)
cartRouter.post("/empty-cart/:userId", EmptyCart);


export default cartRouter;