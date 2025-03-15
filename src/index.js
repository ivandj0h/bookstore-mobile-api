import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import applyLogger from "./middleware/logger.js";

dotenv.config();

const app = express();
connectDB();
applyLogger(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authRoutes);

app.listen(process.env.SERVER_APP_PORT, () => {
  console.log(
    `📡 ${process.env.SERVER_APP_NAME} is running on ${process.env.SERVER_APP_API} : ${process.env.SERVER_APP_PORT}`,
  );
});
