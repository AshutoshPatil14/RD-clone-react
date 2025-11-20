import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No authentication token, authorization denied.", success: false });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ message: "Token verification failed, authorization denied.", success: false });
    }

    req.user = verified; // Attach user payload to req.user
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission to perform this action.", success: false });
    }
    next();
  };
};
