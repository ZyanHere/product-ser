import { express } from 'express';
import { addInventory, getInventory } from '../controllers/inventory.controller';

const router = express.Router();


// GET stock info for a product (and optional variant) 
// e.g., GET /api/inventory/60f7a...?...variantId=1234
router.get("/:productId", getInventory);

// POST create or increment inventory
// Body: { productId, variantId?, quantity, location? }
router.post("/add", addInventory);

export default router;