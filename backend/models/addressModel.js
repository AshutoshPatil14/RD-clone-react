import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  mobile: { type: Number, required: true },
  pincode: { type: Number, required: true },
  city: { type: String, required: true },
  addressLine: { type: String, required: true },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;