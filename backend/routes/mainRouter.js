import { Router } from "express";
import authRoutes from "./authRoutes.js"
// import userRoutes from "./userRoutes.js"
import sellerRoutes from "./sellerRoutes.js"
import productRoutes from "./productRoutes.js"

const mainRouter = Router();

mainRouter.use("/auth", authRoutes);
// mainRouter.use("/user", userRoutes);
mainRouter.use("/seller", sellerRoutes);
mainRouter.use("/products", productRoutes);

export default mainRouter;

