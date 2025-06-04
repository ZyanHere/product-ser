import express from "express";
import {
  getProductsByTag,
  getProductById,
} from "../controllers/productController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// GET /api/products/:section/:tab/:tag
router.get("/:section/:tab/:tag", asyncHandler(getProductsByTag));

// GET /api/products/details/:id
router.get("/details/:id", asyncHandler(getProductById));

export default router;
