import express from "express";
import { updateUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.put("/update-user/:userId", updateUser);

export default userRoutes;
