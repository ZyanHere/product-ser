import { Inventory } from './../models/inventory.schema.js';
import { ApiError } from './../utils/ApiError';

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


export const increaseStock = async ({
    productId,
    variantId = null,
    quantity,
}) => {
    if(quantity <= 0 ){
        throw new ApiError(400, "Quantity must be greater than zero");
    }

    const inventory = await getProductId(productId, variantId);
    if(!inventory) {
        // If no record exists, create with given quantity
        const newInv = new Inventory({
            productId,
            variantId,
            quantity,
        });
        return await newInv.save();
    }
    inventory.quantity += quantity;
    return await inventory.save();
}

export const decreaseStock = async ({
  productId,
  variantId = null,
  quantity,
}) => {
  if (quantity <= 0) {
    throw new ApiError(400, "Quantity to decrease must be greater than zero");
  }

  const inventory = await getByProductId(productId, variantId);
  if (!inventory) {
    throw new ApiError(404, "Inventory record not found");
  }

  if (inventory.quantity < quantity) {
    throw new ApiError(
      400,
      `Insufficient stock: available ${inventory.quantity}, requested ${quantity}`
    );
  }

  inventory.quantity -= quantity;
  return await inventory.save();
};