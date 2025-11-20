import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  role: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

export default User;
