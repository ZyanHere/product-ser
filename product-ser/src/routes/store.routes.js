import express from "express";
import {
  getAllStores,
  getStoreBySlug,
} from "../controllers/store.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

// GET /api/stores
router.get("/", asyncHandler(getAllStores));

// GET /api/stores/:slug
router.get("/:slug", asyncHandler(getStoreBySlug));

export default router;
