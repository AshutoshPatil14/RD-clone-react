import { Router } from "express";
import authRoutes from "./authRoutes.js"
// import userRoutes from "./userRoutes.js"
// import sellerRoutes from "./sellerRoutes.js"

const mainRouter = Router();

mainRouter.use("/auth", authRoutes);
// mainRouter.use("/user", userRoutes);
// mainRouter.use("/seller", sellerRoutes);

export default mainRouter;

