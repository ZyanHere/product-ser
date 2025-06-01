import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  brand: String,
  weight: String,
  seller: String,
  originalPrice: Number,
  discountedPrice: Number,
  discount: String,
  image: String,
  time: Number,
  section: String,
  tab: String,
  tag: String,
  stockStatus: String,
  price: Number,
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
