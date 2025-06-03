import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: String,
    brand: String,
    weight: String,
    seller: String,
    originalPrice: Number,
    discountedPrice: Number,
    discount: String,
    image: String,
    time: Number,
    // For carousel filtering:
    section: String, // e.g. "home", "category", or "store"
    tab: String,     // e.g. "fashion", "grocery", or a store slug
    tag: String,     // e.g. "for-you", "top-brands", or a section under a store
    stockStatus: String,
    price: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
