// productRoutes.js placeholder
import { Router } from "express";
import { getAllProducts, getSingleProduct, searchProducts, getHomepageProducts } from "../controllers/productController.js";

const productRoutes = Router();


productRoutes.get("/homepage-products", getHomepageProducts);

productRoutes.get("/all-products", getAllProducts);

productRoutes.get("/search", searchProducts);

productRoutes.get("/:id", getSingleProduct);


export default productRoutes;