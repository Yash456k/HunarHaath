import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const migrateProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Find products without seller field
    const productsWithoutSeller = await Product.find({ seller: { $exists: false } });
    
    if (productsWithoutSeller.length === 0) {
      console.log("No products need migration");
      return;
    }

    console.log(`Found ${productsWithoutSeller.length} products without seller field`);

    // Create a default seller user ID (you can replace this with an actual user ID)
    const defaultSellerId = new mongoose.Types.ObjectId();

    // Update all products without seller to have a default seller
    const result = await Product.updateMany(
      { seller: { $exists: false } },
      { 
        $set: { 
          seller: defaultSellerId,
          isActive: true 
        } 
      }
    );

    console.log(`Updated ${result.modifiedCount} products with default seller`);
    console.log("Migration completed successfully");

  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateProducts();
}

export default migrateProducts;
