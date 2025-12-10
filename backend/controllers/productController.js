import Product from "../models/productModel.js";

export const getHomepageProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: { isDeleted: false } },
      { $sample: { size: 5 } }, 
      { $sort: { createdAt: -1 } }
    ]);
    res.status(200).json(products);
  }catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
}


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

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await Product.find({
      isDeleted: false,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to search products", error: error.message });
  }
};