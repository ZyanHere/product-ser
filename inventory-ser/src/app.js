// app.js
import express from "express";
import { ApiError } from "./utils/ApiError.js";
import inventoryRoutes from "./routes/inventory.routes.js";


const app = express();

// Middleware to parse JSON
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Inventory Service is running" });
});

// Mount inventory routes
app.use("/api/inventory", inventoryRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  const err = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(err);
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);

  // If it's an instance of ApiError, use its status code; otherwise 500
  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Internal Server Error in Inventory Service";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
});

export default app;
