import nearByStores from "../models/nearbyStores.schema.js";
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

    const userCoords = { latitude: parseFloat(lat), longitude: parseFloat(lng) };

    const nearbyStores = stores
    .map(store => {
      const storeCoords = {
        latitude: store.coordinates.lat,
        longitude: store.coordinates.lng
      };

      const distanceInMeters = geolib.getDistance(userCoords, storeCoords);
      const distanceKm = (distanceInMeters / 1000).toFixed(1);

      return {
        id: store._id,
        img: store.images?.[0] || "/fallback.png",
        name: store.name,
        location: store.location,
        rating: store.rating?.toFixed(1) || "4.9",
        distance: `${distanceKm} Km`,
        distanceRaw: parseFloat(distanceKm)
      };
    })
    .filter(store => store.distanceRaw <= 5) // Filter stores within 5 km
    .sort((a, b) => a.distanceRaw - b.distanceRaw); // Closest first

  if (nearbyStores.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No stores found nearby"));
  }

  res.status(200).json(new ApiResponse(200, nearbyStores));
});