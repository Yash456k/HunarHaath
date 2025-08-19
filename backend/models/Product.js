import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String },
  stock: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
