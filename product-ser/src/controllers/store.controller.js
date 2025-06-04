import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Store } from "../models/stores.schema.js";

// GET /api/stores
export const getAllStores = async (req, res) => {
  // Only select fields needed on /stores page
  const stores = await Store.find(
    {},
    "slug name location logo distance products"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, stores, "Stores fetched successfully"));
};

// GET /api/stores/:slug
export const getStoreBySlug = async (req, res) => {
  const { slug } = req.params;
  const store = await Store.findOne({ slug });
  if (!store) {
    throw new ApiError(404, "Store not found");
  }
  // Return entire store object (including banner, sections, etc.)
  return res
    .status(200)
    .json(new ApiResponse(200, store, "Store details fetched successfully"));
};
