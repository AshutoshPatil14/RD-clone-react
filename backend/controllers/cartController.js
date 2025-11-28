import Cart from "../models/cartModel.js";

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

export const BuyNow = async (req, res) => {
  const { userId, product } = req.body || {};
  const productId = product?._id;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Invalid Data Input", success: false });
  }

  try {
    let existingCart = await Cart.findOne({ userId });

    if (!existingCart) {
      existingCart = new Cart({ userId, products: [{ productId, quantity: 1 }] });
      await existingCart.save();
      return res
        .status(201)
        .json({
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
      return res
        .status(200)
        .json({
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
  const { userId, product } = req.body || {};
  const productId = product?._id;

  // console.log(userId, productId)
  // check for empty fields
  if (!userId || !productId) {
    return res.status(400).json({ message: "Invalid Data Input", success: false });
  }

  // check for existing cart
  const existingCart = await Cart.findOne({ userId });
  console.log(existingCart);
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
};
