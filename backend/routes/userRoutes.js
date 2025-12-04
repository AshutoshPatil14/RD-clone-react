import express from "express";
import { updateUser, getUser, getAddress, addAddress, deleteAddress, updateAddress } from "../controllers/userController.js";
import orderRouter from "./orderRoutes.js";

const userRoutes = express.Router();

userRoutes.put("/update-user/:userId", updateUser);

userRoutes.get("/get-user/:userId", getUser);

userRoutes.post("/add-user-address/:userId", addAddress);

userRoutes.get("/get-user-address/:userId", getAddress);

userRoutes.put("/update-user-address/:userId", updateAddress);

userRoutes.put("/delete-user-address/:userId", deleteAddress);

userRoutes.use("/order", orderRouter);

export default userRoutes;
