import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant", // if you have a separate Variant model; otherwise omit ref
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    location: {
      type: String, // e.g., warehouse name or store code
      default: "default-warehouse",
    },
  },
  {
    timestamps: true,
  }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);