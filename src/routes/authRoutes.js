import express from "express";

const authRoutes = express.Router();
authRoutes.post("/login", async (req, res) => {
  res.send("Login page");
});

authRoutes.post("/register", async (req, res) => {
  res.send("Register page");
});

export default authRoutes;
