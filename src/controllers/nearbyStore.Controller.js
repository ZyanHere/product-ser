import nearByStores from "../models/nearByStores.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getNearbyStores = asyncHandler(async (req, res) => {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
        return res.status(400).json({ message: "Latitude and Longitude are required" });
    }

    // Placeholder logic: In production, use MongoDB geospatial queries
    // const nearbyStores = await Store.find({
    //     coordinates: {
    //         $near: {
    //             $geometry: {
    //                 type: "Point",
    //                 coordinates: [parseFloat(lng), parseFloat(lat)]
    //             },
    //             $maxDistance: 5000 // 5 km radius
    //         }
    //     }
    // });

    const stores = await nearByStores.find({}) // add filtering logic here
    if (!stores || stores.length === 0) {
        return res.status(404).json({ message: "No nearby stores found" });
    }

    const enriched = stores.map(store => ({
        _id: store._id,
        name: store.name,
        images: store.images,
        location: store.location,
        distance: "1 Km",  // <-- Replace with calculated value using coordinates
        rating: store.rating.toFixed(1)
    }));

    res.status(200).json(new ApiResponse(200, enriched, "Nearby stores fetched successfully"));
});