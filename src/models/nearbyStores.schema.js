import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: String,
  images: [String],
  location: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  rating: {
    type: Number,
    default: 4.9
  }
}, { timestamps: true });

export default mongoose.model("Store", storeSchema);
