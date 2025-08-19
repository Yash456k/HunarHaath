import express from "express";
import Product from "../models/Product.js";
import { verifyToken } from "../utils/generateToken.js";

const router = express.Router();

// @route POST /api/products
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, price, image, description, category } = req.body;

    console.log("attributes sent are : " , title, price, image, description);
    const newProduct = new Product({ 
      title, 
      price, 
      image, 
      description, 
      category,
      seller: req.user._id 
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create product" });
  }
});

// @route GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isActive: { $ne: false } })
      .populate('seller', 'name')
      .sort({ createdAt: -1 });
    
    // Handle products without seller field
    const processedProducts = products.map(product => {
      if (!product.seller) {
        return {
          ...product.toObject(),
          seller: { name: 'Unknown Seller' }
        };
      }
      return product;
    });
    
    res.json(processedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Get products by seller
router.get("/seller/:sellerId", verifyToken, async (req, res) => {
  try {
    const products = await Product.find({ 
      seller: req.params.sellerId,
      isActive: true 
    }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch seller products" });
  }
});

// Get a single product (seller-only access)
router.get("/:productId", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this product" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

// Update product
router.put("/:productId", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user is the seller
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this product" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// Delete product
router.delete("/:productId", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user is the seller
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    await Product.findByIdAndDelete(req.params.productId);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
