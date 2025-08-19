import express from "express";
import mongoose from "mongoose";
import CustomOrder from "../models/CustomOrder.js";
import Order from "../models/Order.js";
import { verifyToken } from "../utils/generateToken.js";

const router = express.Router();

// Create a custom order
router.post("/custom", verifyToken, async (req, res) => {
  try {
    // Block sellers from creating custom orders
    if (req.user.isSeller) {
      return res.status(403).json({ message: "Sellers cannot place custom orders" });
    }
    const {
      productName,
      description,
      quantity,
      budget,
      timeline,
      specialRequirements
    } = req.body;

    const customOrder = new CustomOrder({
      customerId: req.user._id,
      customerName: req.user.name,
      customerEmail: req.user.email,
      productName,
      description,
      quantity,
      budget,
      timeline,
      specialRequirements
    });

    const savedOrder = await customOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a regular order (checkout)
router.post("/checkout", verifyToken, async (req, res) => {
  try {
    // Block sellers from checking out
    if (req.user.isSeller) {
      return res.status(403).json({ message: "Sellers cannot place regular orders" });
    }
    const {
      items,
      totalAmount
    } = req.body;

    const order = new Order({
      customerId: req.user._id,
      customerName: req.user.name,
      customerEmail: req.user.email,
      items,
      totalAmount,
      status: 'pending'
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update regular order status (seller)
router.put("/regular/:orderId/status", verifyToken, async (req, res) => {
  try {
    if (!req.user.isSeller) {
      return res.status(403).json({ message: "Only sellers can update order status" });
    }

    const { status } = req.body; // expected: confirmed, shipped, delivered, cancelled
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure this order contains items from this seller
    const sellerProductIds = await getProductIdsBySeller(req.user._id.toString());
    const orderContainsSellerItem = (order.items || []).some(item => sellerProductIds.some(id => id.toString() === (item.productId || '').toString()));
    if (!orderContainsSellerItem) {
      return res.status(403).json({ message: "Not authorized to update this order" });
    }

    order.status = status || order.status;
    order.sellerId = req.user._id; // mark last updater
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get custom orders for a seller
router.get("/seller/:sellerId", verifyToken, async (req, res) => {
  try {
    // Get custom orders that this seller has accepted (has sellerId)
    const acceptedCustomOrders = await CustomOrder.find({ sellerId: req.params.sellerId })
      .populate('customerId', 'name email')
      .sort({ createdAt: -1 });
    
    // Get pending custom orders that no seller has accepted yet
    const pendingCustomOrders = await CustomOrder.find({ 
      status: 'pending',
      sellerId: { $exists: false }
    })
    .populate('customerId', 'name email')
    .sort({ createdAt: -1 });
    
    // Get regular orders for products sold by this seller
    const regularOrders = await Order.find({ 
      'items.productId': { $in: await getProductIdsBySeller(req.params.sellerId) }
    })
    .populate('customerId', 'name email')
    .sort({ createdAt: -1 });
    
    res.json({
      acceptedCustomOrders,
      pendingCustomOrders,
      regularOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to get product IDs by seller
async function getProductIdsBySeller(sellerId) {
  const Product = mongoose.model('Product');
  const products = await Product.find({ seller: sellerId }).select('_id');
  return products.map(p => p._id);
}

// Get custom orders for a customer
router.get("/user/:userId", verifyToken, async (req, res) => {
  try {
    const customOrders = await CustomOrder.find({ customerId: req.params.userId })
      .populate('sellerId', 'name email')
      .sort({ createdAt: -1 });
    
    const regularOrders = await Order.find({ customerId: req.params.userId })
      .populate('sellerId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      customOrders,
      regularOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (for sellers)
router.put("/:orderId", verifyToken, async (req, res) => {
  try {
    const { status, sellerResponse, estimatedPrice, estimatedDelivery } = req.body;
    
    const order = await CustomOrder.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only allow sellers to update orders
    if (!req.user.isSeller) {
      return res.status(403).json({ message: "Only sellers can update orders" });
    }

    // Only allow valid transitions
    const allowed = ['pending','accepted','rejected','shipped','delivered','completed'];
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    order.status = status || order.status;
    order.sellerResponse = sellerResponse || order.sellerResponse;
    order.estimatedPrice = estimatedPrice || order.estimatedPrice;
    order.estimatedDelivery = estimatedDelivery || order.estimatedDelivery;
    order.sellerId = req.user._id;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all pending custom orders (for sellers to browse)
router.get("/pending", verifyToken, async (req, res) => {
  try {
    if (!req.user.isSeller) {
      return res.status(403).json({ message: "Only sellers can view pending orders" });
    }

    const orders = await CustomOrder.find({ 
      status: 'pending',
      sellerId: { $exists: false }
    })
    .populate('customerId', 'name email')
    .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
