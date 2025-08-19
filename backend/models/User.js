import mongoose from "mongoose";

// models/User.js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSeller: { type: Boolean, default: false },
  phone: { type: String },
  address: { type: String },
  bio: { type: String },
  profileImage: { type: String }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
