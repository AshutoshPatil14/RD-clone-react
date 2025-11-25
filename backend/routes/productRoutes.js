// productRoutes.js placeholder
import { Router } from "express";
import { getAllProducts, getSingleProduct, searchProducts } from "../controllers/productController.js";

const productRoutes = Router();


productRoutes.get("/all-products", getAllProducts);

productRoutes.get("/search", searchProducts);

productRoutes.get("/:id", getSingleProduct);


export default productRoutes;