import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/productControllers.js";

const router = express.Router();

router.post("/addproduct", createProduct);
router.get("/allproducts", getAllProducts);
router.get("/:id", getProductById);
router.patch("/updateproduct/:id", updateProductById)
router.delete("/deleteproduct/:id", deleteProductById);

export default router;
