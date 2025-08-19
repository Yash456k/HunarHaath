import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../utils/generateToken.js";

const router = express.Router();

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const { name, email, phone, address, bio } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.bio = bio || user.bio;

    const updatedUser = await user.save();
    const userResponse = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      bio: updatedUser.bio,
      isSeller: updatedUser.isSeller,
      createdAt: updatedUser.createdAt
    };

    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Become a seller
router.put("/become-seller", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isSeller = true;
    const updatedUser = await user.save();
    
    const userResponse = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      bio: updatedUser.bio,
      isSeller: updatedUser.isSeller,
      createdAt: updatedUser.createdAt
    };

    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all sellers
router.get("/sellers", async (req, res) => {
  try {
    const sellers = await User.find({ isSeller: true })
      .select('name email bio createdAt')
      .sort({ createdAt: -1 });
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
