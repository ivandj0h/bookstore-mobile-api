import express from "express";
import bookController from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware.protect, bookController.createBook);
router.get("/", authMiddleware.protect, bookController.getAllBooks);
router.get("/:id", authMiddleware.protect, bookController.getBookById);

export default router;
