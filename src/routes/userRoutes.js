import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", authMiddleware.protect, userController.getAllUsers);
router.get("/:id", authMiddleware.protect, userController.getUserById);
router.put(
  "/:id",
  authMiddleware.protect,
  upload.single("profileImage"),
  userController.updateUser,
);
router.delete("/:id", authMiddleware.protect, userController.deleteUser);
router.post(
  "/:id/upload-image",
  authMiddleware.protect,
  upload.single("profileImage"),
  userController.uploadUserImage,
);

export default router;
