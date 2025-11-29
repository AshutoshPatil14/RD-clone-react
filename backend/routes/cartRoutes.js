import express from "express";
import { AddProductToCart, BuyNow, EmptyCart, GetCartProducts, RemoveCartItem, UpdateCartProductQuantity } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", AddProductToCart);
cartRouter.post("/buy-now", BuyNow);
cartRouter.get("/get-cart-products/:userId", GetCartProducts)
cartRouter.post("/empty-cart/:userId", EmptyCart);
cartRouter.post("/remove-from-cart", RemoveCartItem);
cartRouter.post("/update-quantity", UpdateCartProductQuantity);


export default cartRouter;