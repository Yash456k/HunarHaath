import mongoose from "mongoose";

const customOrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  budget: { type: String, required: true },
  timeline: { type: String, required: true },
  specialRequirements: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'shipped', 'delivered', 'completed'], 
    default: 'pending' 
  },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sellerResponse: { type: String },
  estimatedPrice: { type: Number },
  estimatedDelivery: { type: Date }
}, { timestamps: true });

const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);
export default CustomOrder;
