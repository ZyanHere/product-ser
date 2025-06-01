import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import errorHandler from "./middlewares/errorHandler.js";
import { connectDB } from "./database/dbConnection.js";
import productRoutes from "./routes/product.routes.js";


dotenv.config();
const app = express();

const allowedOrigins = ["http://localhost:3000", "https://yourapp.com"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use(express.json());
app.use("/api/products", productRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
