import express from "express";
import { getNearbyStores } from "../controllers/nearByStore.Controller";

const router = express.Router();

router.get("/nearby", getNearbyStores);

export default router;
