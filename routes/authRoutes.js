import express from "express";
import jwt from "jsonwebtoken";
import {
  loginController,
  registerController,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registerController);
router.post(
  "/login",
  loginController
);

export default router;
