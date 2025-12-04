import { Router } from "express";
import authRoutes from "./authRoutes.js"
import userRoutes from "./userRoutes.js"
import sellerRoutes from "./sellerRoutes.js"
import productRoutes from "./productRoutes.js"
import cartRouter from "./cartRoutes.js";
import wishlistRouter from "./wishlistRoutes.js";
import adminRouter from "./adminRoutes.js";

const mainRouter = Router();

mainRouter.use("/auth", authRoutes);
mainRouter.use("/user", userRoutes);
mainRouter.use("/seller", sellerRoutes);
mainRouter.use("/products", productRoutes);
mainRouter.use("/cart", cartRouter)
mainRouter.use("/wishlist", wishlistRouter)
mainRouter.use("/admin", adminRouter);


export default mainRouter;

