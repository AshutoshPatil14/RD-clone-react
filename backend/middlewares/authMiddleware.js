import User from "../models/userModel.js";

export const roleChecker = async (req, res, next) => {
try {
    const userId = req.body.sellerId;
    console.log(userId);
    const seller = await User.findById(userId);
    if (!seller) {
      return res.status(401).json({ message: "Seller not found", success: false });
    }
    if (seller.role !== "seller") {
      return res.status(401).json({ message: "False", success: false });
    }
    next();
} catch (error) {
    console.log(error, "roleChecker error");
    return res.status(401).json({ message: "Unauthorized", success: false });
}
};
