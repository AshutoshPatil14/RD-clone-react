import express from "express";
import { GetWishlistProducts, AddProductToWishlist, RemoveProductFromWishlist } from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.get("/get-wishlist-products/:userId", GetWishlistProducts);
wishlistRouter.post("/add-to-wishlist", AddProductToWishlist);
wishlistRouter.delete("/remove-from-wishlist", RemoveProductFromWishlist);

export default wishlistRouter;