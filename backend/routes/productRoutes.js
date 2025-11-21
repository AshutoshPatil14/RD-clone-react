// productRoutes.js placeholder
import { Router } from "express";
import { getAllProducts, getSingleProduct } from "../controllers/productController.js";

const productRoutes = Router();


productRoutes.get("/all-products", getAllProducts);

productRoutes.get("/:id", getSingleProduct);


export default productRoutes;