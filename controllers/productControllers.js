import { Product } from "../models/productModels.js";


export const createProduct = async (req, res) => {
  try {
    let product = req.body;
    const existingProduct = await Product.findOne({ name: product.name });
    if (existingProduct) {
      return res.status(400).json({message: "Product already exists"});
    }
    // hash password from front end
    if (!product.name || !product.description || !product.price || !product.category || !product.imageUrl) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let newProduct = new Product(product);
    newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("error creating product:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({}, {password: 0});
    res.status(200).json({
      message: "Data retrieved successfully",
      data: allProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({
      message: "email is required",
    });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product does not exist on our database!" });
    }
    res.status(200).json({
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(400).json({
      message: "product does not exist in database",
      error: error.message,
    });
  }
};

export const deleteProductById = async (req, res) => {
    const productId = req.params.id;
    if (!productId) {
        return res.status(400).json({
            message: "Product ID is required",
        });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        res.status(200).json({
            message: "Product deleted successfully",
            data: deletedProduct,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

