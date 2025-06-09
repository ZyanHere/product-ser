import { addOrUpdateInventory, getByProductId } from "../services/inventory.service.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * GET /api/inventory/:productId
 * Optionally accepts ?variantId=… 
 */
export const getInventory = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { variantId } = req.query;

  const inventory = await getByProductId(productId, variantId || null);
  if (!inventory) {
    // If not found, return quantity = 0
    return res.status(200).json({
      productId,
      variantId: variantId || null,
      quantity: 0,
    });
  }
  res.status(200).json(inventory);
});


/**
 * POST /api/inventory/add
 * Creates a new inventory record or increments existing by `quantity`.
 *
 * Body: { productId, variantId?, quantity, location? }
 */
export const addInventory = asyncHandler(async (req, res) => {
  const { productId, variantId, quantity, location } = req.body;
  if (!productId || typeof quantity !== "number") {
    throw new ApiError(400, "productId and quantity are required");
  }
  const updated = await addOrUpdateInventory({
    productId,
    variantId: variantId || null,
    quantity,
    location,
  });
  res.status(201).json(updated);
});
