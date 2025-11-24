import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  const { name, price, category, imgUrl, stock, sellerId } = req.body || {};
  console.log(req.body);
  if (!name || !price || !category || !imgUrl || !stock) {
    return res.status(400).json({ message: "Please fill the missing fields", success: false });
  }

  const product = new Product({
    name,
    price,
    category,
    imgUrl,
    stock,
    sellerId,
  });

  await product.save();

  res.status(201).json({ message: "Product added successfully", success: true });
};

export const getSellerProducts = async (req, res) => {
  try {
    const sellerId = req.user._id;
    if (!sellerId) {
      return res.status(400).json({ message: "Please provide sellerId", success: false });
    }

    const products = await Product.find({ sellerId, isDeleted: false });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this seller", success: false });
    }

    res.status(200).json({ products, success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const editProduct = async (req, res) => {
  // console.log(req)
  const { productId } = req.params;
  const { name, color, price, category, imgUrl, stock } = req.body;

  //   console.log('Edit Product Request:');
  //   console.log('  productId:', productId);
  //   console.log('  req.body:', req.body);

  const sellerId = req.body.sellerId;
  //   console.log('  sellerId from req.user:', sellerId);

  try {
    const product = await Product.findOne({ _id: productId, sellerId });
    console.log("  Product found:", product ? product._id : "None");

    if (!product) {
      return res.status(404).json({
        message: "Product not found or you are not authorized to edit this product",
        success: false,
      });
    }

    product.name = name || product.name;
    product.color = color || product.color;
    product.price = price || product.price;
    product.category = category || product.category;
    product.imgUrl = imgUrl || product.imgUrl;
    product.stock = stock || product.stock;

    await product.save();

    res.status(200).json({ message: "Product updated successfully", success: true, product });
  } catch (error) {
    console.error("Error in editProduct:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const sellerId = req.body.sellerId;
  // console.log(productId, "productId", sellerId, "sellerId");

  try {
    const product = await Product.findOneAndUpdate({ _id: productId, sellerId });
    // console.log(product, "product");

    product.isDeleted = true;
    await product.save();

    if (!product) {
      return res.status(404).json({
        message: "Product not found or you are not authorized to delete this product",
        success: false,
      });
    }

    res.status(200).json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
