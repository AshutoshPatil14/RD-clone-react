import Address from "../models/addressModel.js";
import User from "../models/userModel.js";

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = req.body;

    // Validate userId and updatedUser data

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (updatedUser.fname !== undefined) user.fname = updatedUser.fname;
    if (updatedUser.lname !== undefined) user.lname = updatedUser.lname;
    if (updatedUser.phone !== undefined) user.phone = updatedUser.phone;
    if (updatedUser.gender !== undefined) user.gender = updatedUser.gender;
    if (updatedUser.dateOfBirth !== undefined) user.dateOfBirth = updatedUser.dateOfBirth;

    // Save the updated user

    await User.findByIdAndUpdate(userId, user);

    const userResponse = {
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
    };

    res
      .status(200)
      .json({ message: "User updated successfully", user: userResponse, success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = {
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
    };

    res
      .status(200)
      .json({ message: "User retrieved successfully", user: userResponse, success: true });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    const address = await Address.findOne({ userId }).populate("address");
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    const addressResponse = address.address
      .filter((addr) => !addr.isDeleted)
      .map((address) => ({
        id: address._id,
        fullName: address.fullName,
        mobile: address.mobile,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        addressLine: address.addressLine,
      }));

    res
      .status(200)
      .json({ message: "Address retrieved successfully", address: addressResponse, success: true });
  } catch (error) {
    console.error("Error retrieving address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const addressFromBody = req.body;

    // Validate userId and address data

    let address = await Address.findOne({ userId });

    if (!address) {
      address = new Address({ userId, address: [] });
    }

    // Add address to user's address array
    address.address.push(addressFromBody);

    // Save the updated user
    await address.save();

    const addressResponse = {
      fullName: addressFromBody.fullName,
      mobile: addressFromBody.mobile,
      city: addressFromBody.city,
      state: addressFromBody.state,
      pincode: addressFromBody.pincode,
      addressLine: addressFromBody.addressLine,
    };

    res
      .status(200)
      .json({ message: "Address added successfully", address: addressResponse, success: true });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { addressId, ...updatedAddressData } = req.body;

    const address = await Address.findOne({ userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    const addressToUpdate = address.address.find(
      (addr) => addr._id.toString() === addressId
    );

    if (!addressToUpdate) {
      return res.status(404).json({ message: "Address not found in user's list" });
    }

    // Update fields of the found address
    Object.assign(addressToUpdate, updatedAddressData);

    await address.save();

    res.status(200).json({ message: "Address updated successfully", address: addressToUpdate, success: true });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const addressId = req.body.addressId;

    console.log(addressId)
  

    // Validate userId and addressId data

    const address = await Address.findOne({ userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Find the address and set isDeleted to true
    const addressToMarkDeleted = address.address.find(
      (addr) => addr._id.toString() === addressId
    );

    if (!addressToMarkDeleted) {
      return res.status(404).json({ message: "Address not found in user's list" });
    }

    addressToMarkDeleted.isDeleted = true;

    // Save the updated user
    await address.save();

    res.status(200).json({ message: "Address deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
