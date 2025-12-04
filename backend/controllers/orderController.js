import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  const orderData = req.body;
    // console.log(orderData);

  const { userId, products, totalAmount, paymentMethod, addressId } = orderData;

  // Create a new order instance

  const newOrder = new Order({
    userId,
    products,
    totalAmount,
    paymentMethod,
    addressId,
  });

//   console.log(newOrder)
  const savedOrder = await newOrder.save();

  res.status(201).json({ message: "Order placed successfully", order: savedOrder });
};
