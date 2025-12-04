import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
    status: { type: String, default: "Pending" }, // Pending → Confirmed → Delivered
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
