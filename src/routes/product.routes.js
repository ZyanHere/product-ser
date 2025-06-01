import express from "express";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { getProductById, getProductsByTag } from "../controllers/product.Controller.js";


const router = express.Router();

// /api/products/home/fashion/for-you
router.get("/:section/:tab/:tag", asyncHandler(getProductsByTag));

// /api/products/:id
router.get("/details/:id", asyncHandler(getProductById));

export default router;
