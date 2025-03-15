import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
if (!userController?.getAllUsers || !userController?.getUserById) {
  console.error("Error: userController is missing getAllUsers or getUserById");
}
if (!authMiddleware?.protect) {
  console.error("Error: authMiddleware is missing protect");
  throw new Error(
    "authMiddleware.protect is undefined, check import or export",
  );
}

router.get("/", authMiddleware.protect, userController.getAllUsers);
router.get("/:id", authMiddleware.protect, userController.getUserById);

export default router;
