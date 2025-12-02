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

    res.status(200).json({ message: "User updated successfully", user: userResponse });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
