import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isSeller: user.isSeller },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch full user details from database
    const User = mongoose.model('User');
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isSeller: user.isSeller
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export default generateToken;
