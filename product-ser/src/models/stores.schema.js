import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true }, // e.g., "pantaloons"
    name: String,
    location: String,
    logo: String,
    banner: String,
    distance: String,
    rating: { type: Number, default: 4.9 },
    sections: [String], // e.g., ["Fashion", "Apparel"]
    products: [
      {
        id: Number,
        name: String,
        image: String,
        price: Number,
        mrp: Number,
        discount: String,
        section: String, // always "store"
        tab: String,     // store slug
        tag: String,     // section name under store
        // any other minimal product‐card fields
      },
    ],
  },
  { timestamps: true }
);

export const Store = mongoose.model("Store", StoreSchema);
