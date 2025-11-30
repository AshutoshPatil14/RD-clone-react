import Wishlist from "../models/wishlistModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import { cacheSignal } from "react";

export const GetWishlistProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required", success: false });
    }

    const existingWishlist = await Wishlist.findOne({ userId }).populate("products.productId"); // <-- THIS FIXES EVERYTHING

    if (!existingWishlist || existingWishlist.products.length === 0) {
      return res.status(200).json([]);
    }

    const wishlistProducts = existingWishlist.products.map((item) => ({
      product: item.productId, // full product object is now available
      addedAt: item.addedAt,
    }));

    res.status(200).json(wishlistProducts);
  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    res.status(500).json({ message: "Failed to fetch wishlist products", success: false });
  }
};

export const AddProductToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "User ID and Product ID are required", success: false });
  }

  try {
    const existingCartItem = await Cart.findOne({ userId, "products.productId": productId });

    // remove item from cart
    if (existingCartItem) {
      existingCartItem.products = existingCartItem.products.filter(
        (item) => item.productId.toString() !== productId
      );
      await existingCartItem.save();
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [{ productId }] });
      await wishlist.save();
      return res
        .status(201)
        .json({ message: "Wishlist created and product added", success: true, wishlist });
    } else {
      const existingProduct = wishlist.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        return res.status(409).json({ message: "Product already in wishlist", success: false });
      } else {
        wishlist.products.push({ productId });
        await wishlist.save();
        return res
          .status(200)
          .json({ message: "Product added to wishlist", success: true, wishlist });
      }
    }
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ message: "Failed to add product to wishlist", success: false });
  }
};

export const RemoveProductFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "User ID and Product ID are required", success: false });
  }

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found", success: false });
    }

    const initialLength = wishlist.products.length;
    wishlist.products = wishlist.products.filter((item) => item.productId.toString() !== productId);

    if (wishlist.products.length === initialLength) {
      return res.status(404).json({ message: "Product not found in wishlist", success: false });
    }

    await wishlist.save();
    res.status(200).json({ message: "Product removed from wishlist", success: true, wishlist });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({ message: "Failed to remove product from wishlist", success: false });
  }
};
