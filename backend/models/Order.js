import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String }
  }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  shippingAddress: { type: String },
  paymentMethod: { type: String },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sellerResponse: { type: String },
  estimatedDelivery: { type: Date }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
