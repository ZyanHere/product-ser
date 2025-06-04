import mongoose from "mongoose";

const ProductDetailsSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: String,
    category: String,
    image: String,
    weight: String,
    price: Number,
    mrp: Number,
    discount: String,
    details: {
      image: String,
      rating: String,
      description: String,
      seller: {
        license: String,
        location: String,
      },
      specs: {
        type: String,
        unit: String,
        Info: String,
      },
      weightOptions: [
        {
          value: Number,
          label: String,
          price: Number,
        },
      ],
      timerEnd: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductDetails", ProductDetailsSchema);
