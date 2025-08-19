import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// @route POST /api/products
router.post("/", async (req, res) => {
  try {

    const { title, price, image, description } = req.body;

    console.log("attributes sent are : " , title, price, image, description);
    const newProduct = new Product({ title, price, image, description });
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
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

export default router;
