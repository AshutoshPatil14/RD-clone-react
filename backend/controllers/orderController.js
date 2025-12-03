import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    const calculateTotalPrice = (items) => {
      return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    // Create a new order
    const order = new Order({
      userId,
      products: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: calculateTotalPrice(items),
      paymentMethod: req.body.paymentMethod,
      address: req.body.address,
      status: "pending",
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
