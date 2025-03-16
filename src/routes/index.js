import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import bookRoutes from "./bookRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);

console.log(
  "Book routes:",
  bookRoutes.stack.map((r) => r.route?.path).filter(Boolean),
);

export default router;
