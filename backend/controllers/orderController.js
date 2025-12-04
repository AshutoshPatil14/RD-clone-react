import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";

export const createOrder = async (req, res) => {
  const orderData = req.body;
  // console.log(orderData);

  const { userId, products, totalAmount, paymentMethod, addressId } = orderData;

  // Check product stock before creating the order
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) {
      return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
    }
    if (product.stock < item.quantity) {
      return res.status(400).json({
        message: `Insufficient stock for product ${product.name}. Available: ${product.stock}, Ordered: ${item.quantity}`,
      });
    }
  }

  const newOrder = new Order({
    userId,
    products,
    totalAmount,
    paymentMethod,
    addressId,
  });

  console.log(newOrder);
  const savedOrder = await newOrder.save();

  // Reduce product stock after successful order
  for (const item of products) {
    await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
  }

  const existingCart = await Cart.findOne({ userId }).populate("products.productId");

  if (!existingCart || existingCart.products.length === 0) {
    return res.status(200).json([]); // Return empty array if cart is empty or not found
  }

  existingCart.products = [];
  existingCart.totalPrice = 0;
  existingCart.totalItems = 0;

  await existingCart.save();

  res.status(201).json({ message: "Order placed successfully", order: savedOrder, success: true });
};

export const getOrders = async (req, res) => {
  const userId = req.params.userId;

  // console.log(userId)

  try {
    const orders = await Order.find({ userId }).populate("products.productId");

    // console.log(orders)
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSellerOrders = async (req, res) => {
  const { userId: sellerId } = req.body; // frontend sends sellerId in POST body

  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ message: "Invalid sellerId format" });
    }

    const orders = await Order.aggregate([
      // Break products array
      { $unwind: "$products" },

      // Join product details
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },

      // Match only this seller's products
      {
        $match: {
          "productDetails.sellerId": new mongoose.Types.ObjectId(sellerId),
        },
      },

      // Re-group order but only keep seller's products
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          address: { $first: "$address" },
          paymentMethod: { $first: "$paymentMethod" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },

          products: {
            $push: {
              _id: "$productDetails._id",
              name: "$productDetails.name",
              imgUrl: "$productDetails.imgUrl",
              price: "$productDetails.price",
              category: "$productDetails.category",
              quantity: "$products.quantity",
            },
          },

          totalAmount: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.price"],
            },
          },
        },
      },

      { $sort: { createdAt: -1 } },
    ]);

    return res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.log("Seller Order Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
