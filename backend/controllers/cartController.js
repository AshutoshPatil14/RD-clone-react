import Cart from "../models/cartModel.js";
import Wishlist from "../models/wishlistModel.js";

export const GetCartProducts = async (req, res) => {
  const { userId } = req.params || {};

  // check for empty fields
  if (!userId) {
    return res.status(400).json({ message: "User ID is required", success: false });
  }

  try {
    // Find the cart for the user and populate product details
    const existingCart = await Cart.findOne({ userId }).populate("products.productId");

    if (!existingCart || existingCart.products.length === 0) {
      return res.status(200).json([]); // Return empty array if cart is empty or not found
    }

    // Map the populated products to a more usable format
    const cartProducts = existingCart.products.map((item) => ({
      product: item.productId, // The populated product object
      quantity: item.quantity,
    }));

    res.status(200).json(cartProducts);
  } catch (error) {
    console.error("Error fetching cart products:", error);
    res.status(500).json({ message: "Failed to fetch cart products", success: false });
  }
};

export const EmptyCart = async (req, res) => {
  const { userId } = req.params || {};
  // check for empty fields
  if (!userId) {
    return res.status(400).json({ message: "User ID is required", success: false });
  }
  try {
    // Find the cart for the user and populate product details
    const existingCart = await Cart.findOne({ userId }).populate("products.productId");

    if (!existingCart || existingCart.products.length === 0) {
      return res.status(200).json([]); // Return empty array if cart is empty or not found
    }

    existingCart.products = [];
    existingCart.totalPrice = 0;
    existingCart.totalItems = 0;

    await existingCart.save();

    res.status(200).json({ message: "Cart emptied successfully", success: true });
  } catch (error) {
    console.error("Error fetching cart products:", error);
    res.status(500).json({ message: "Failed to fetch cart products", success: false });
  }
};

export const BuyNow = async (req, res) => {
  const { userId, productId } = req.body || {};

  if (!userId || !productId) {
    return res.status(400).json({ message: "Invalid Data Input", success: false });
  }

  try {
    let existingCart = await Cart.findOne({ userId });

    if (!existingCart) {
      existingCart = new Cart({ userId, products: [{ productId, quantity: 1 }] });
      await existingCart.save();
      return res.status(201).json({
        message: "Product added to cart and proceeding to checkout",
        success: true,
        cart: existingCart,
      });
    } else {
      const existingProduct = existingCart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        existingCart.products.push({ productId, quantity: 1 });
      }
      await existingCart.save();
      return res.status(200).json({
        message: "Product added to cart and proceeding to checkout",
        success: true,
        cart: existingCart,
      });
    }
  } catch (error) {
    console.error("Error in BuyNow:", error);
    res.status(500).json({ message: "Failed to process buy now", success: false });
  }
};

export const AddProductToCart = async (req, res) => {
  const { userId, productId } = req.body || {};

  // check for empty fields
  if (!userId || !productId) {
    return res.status(400).json({ message: "Invalid Data Input", success: false });
  }

  try {
    // Remove product from wishlist if it exists there
    let wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (item) => item.productId.toString() !== productId
      );
      await wishlist.save();
    }

    // check for existing cart
    const existingCart = await Cart.findOne({ userId });
    // console.log(existingCart);
    if (!existingCart) {
      // create new cart
      const newCart = new Cart({ userId, products: [{ productId, quantity: 1 }] });
      await newCart.save();
      return res
        .status(201)
        .json({ message: "Cart created and product added", success: true, cart: newCart });
    } else {
      // check for existing product in cart
      const existingProduct = existingCart.products.find(
        (item) => item.productId.toString() === productId
      );
      if (existingProduct) {
        // update quantity
        existingProduct.quantity += 1;
        await existingCart.save();
        return res
          .status(200)
          .json({ message: "Product quantity updated", success: true, cart: existingCart });
      } else {
        // add new product
        existingCart.products.push({ productId, quantity: 1 });
        await existingCart.save();
        return res
          .status(200)
          .json({ message: "Product added to cart", success: true, cart: existingCart });
      }
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Failed to add product to cart", success: false });
  }
};

export const RemoveCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate input
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data input",
      });
    }

    // Find cart
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Check if product exists in cart
    const itemExists = cart.products.some((item) => item.productId._id.toString() === productId);

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Remove the item
    cart.products = cart.products.filter((item) => item.productId._id.toString() !== productId);

    // Recalculate totals
    cart.totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);

    cart.totalPrice = cart.products.reduce(
      (sum, item) => sum + item.quantity * item.productId.price,
      0
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Error removing item:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove item",
    });
  }
};

export const UpdateCartProductQuantity = async (req, res) => {
  const { userId, productId, newQuantity } = req.body || {};

  // check for empty fields
  if (!userId || !productId || !newQuantity) {
    return res.status(400).json({ message: "Invalid Data Input", success: false });
  }

  try {
    // Find cart
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Check if product exists in cart
    const itemExists = cart.products.some((item) => item.productId._id.toString() === productId);

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Update quantity
    cart.products = cart.products.map((item) =>
      item.productId._id.toString() === productId ? { ...item, quantity: newQuantity } : item
    );

    // Recalculate totals
    cart.totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);

    cart.totalPrice = cart.products.reduce(
      (sum, item) => sum + item.quantity * item.productId.price,
      0
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update quantity",
    });
  }
};
