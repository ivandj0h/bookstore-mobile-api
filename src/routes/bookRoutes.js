import express from "express";
import bookController from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware.protect,
  upload.single("imageUrl"),
  bookController.createBook,
);
router.get("/", authMiddleware.protect, bookController.getAllBooks);
router.get("/:id", authMiddleware.protect, bookController.getBookById);
router.put(
  "/:id",
  authMiddleware.protect,
  upload.single("imageUrl"),
  bookController.updateBook,
);
router.delete("/:id", authMiddleware.protect, bookController.deleteBook);
router.post(
  "/:id/upload-image",
  authMiddleware.protect,
  upload.single("imageUrl"),
  bookController.uploadBookImage,
);

export default router;
