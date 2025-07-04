import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productControllers.js";

const router = express.Router();

router.post("/addproduct", createProduct);
router.get("/allproducts", getAllProducts);
router.get("/:id", getProductById);

export default router;
