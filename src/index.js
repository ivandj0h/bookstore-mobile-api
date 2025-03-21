import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import applyLogger from "./middleware/logger.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB();
applyLogger(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(process.env.API_PREFIX, routes);

app.listen(process.env.SERVER_APP_PORT, () => {
  console.log(
    `📡 ${process.env.SERVER_APP_NAME} is running on ${process.env.SERVER_APP_API} : ${process.env.SERVER_APP_PORT}`,
  );
});
