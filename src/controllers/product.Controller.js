import Product from "../models/product.schema.js";
import ProductDetails from "../models/productDetails.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const getProductsByTag = async (req, res) => {
  const { section, tab, tag } = req.params;

  const products = await Product.find({ section, tab, tag });
  if (!products || products.length === 0) {
    throw new ApiError(404, "No products found for this tag");
  }

  res.status(200).json(new ApiResponse(200, products, "Products fetched"));
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductDetails.findOne({ id });
  if (!product) {
    throw new ApiError(404, "Product details not found");
  }

  res.status(200).json(new ApiResponse(200, product, "Product details fetched"));
};
