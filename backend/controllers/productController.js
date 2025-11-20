import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category && category !== "all") {
      filter.category = category;
    }

    const products = await Product.find(filter);
    // console.log(products, "products");
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};