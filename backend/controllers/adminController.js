import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";




export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};




export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("sellerId", "name email");
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};



export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      // 1. Expand products
      { $unwind: "$products" },

      // 2. Join product details
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },

      // 3. Join seller details
      {
        $lookup: {
          from: "users",
          localField: "productDetails.sellerId",
          foreignField: "_id",
          as: "sellerDetails"
        }
      },
      { $unwind: "$sellerDetails" },

      // 4. Join customer details
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "customerDetails"
        }
      },
      { $unwind: "$customerDetails" },

      // 5. Regroup back into full order structure
      {
        $group: {
          _id: "$_id",
          customer: { $first: "$customerDetails" },
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
              seller: "$sellerDetails"
            }
          },

          totalAmount: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.price"]
            }
          }
        }
      },

      { $sort: { createdAt: -1 } }
    ]);

    res.status(200).json({ orders });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch admin orders" });
  }
};
