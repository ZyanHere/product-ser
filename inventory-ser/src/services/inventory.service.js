import { Inventory } from './../models/inventory.schema.js';

export const getProductId = async (productId, varientId = null) => {
    const query = { productId };
    if(varientId) {
        query.varientId = varientId;
    }
    const inventory = await Inventory.findOne(query);
    return inventory ? inventory._id : null;
}

export const addOrUpdateInventory = async ({
  productId,
  variantId = null,
  quantity,
  location = "default-warehouse",
}) => {
  // If an inventory record exists for this product (+ variant), update quantity (increment).
  const query = { productId };
  if (variantId) query.variantId = variantId;
  const update = {
    $set: { location },
    $inc: { quantity },
  };
  const options = { new: true, upsert: true, setDefaultsOnInsert: true };
  const updated = await Inventory.findOneAndUpdate(query, update, options);
  return updated;
};
