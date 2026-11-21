import Product from "../models/productModel.js";
import mongoose from "mongoose";

const createProductForm = (req, res) => {
  res.render("product-form", { product: null });
};

const createProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.render("error", { error: "Database is connecting or offline. Please try again in a few seconds." });
    }
    const { name, description, category, price } = req.body;
    const product = new Product({ name, description, category, price });
    await product.save();
    res.redirect("/");
  } catch (error) {
    res.render("error", { error: error.message });
  }
};

const readProducts = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.warn("MongoDB is not connected. Rendering empty products list.");
      return res.render("products", { products: [] });
    }
    const products = await Product.find({});
    res.render("products", { products });
  } catch (error) {
    res.render("error", { error: error.message });
  }
};

const readProductById = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.render("error", { error: "Database is connecting or offline. Please try again in a few seconds." });
    }
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("product", { product });
  } catch (error) {
    res.render("error", { error: error.message });
  }
};

const updateProductForm = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.render("error", { error: "Database is connecting or offline. Please try again in a few seconds." });
    }
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("product-form", { product });
  } catch (error) {
    res.render("error", { error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.render("error", { error: "Database is connecting or offline. Please try again in a few seconds." });
    }
    const { id } = req.params;
    const { name, description, category, price } = req.body;
    await Product.findByIdAndUpdate(id, { name, description, category, price });
    res.redirect("/");
  } catch (error) {
    res.render("error", { error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.render("error", { error: "Database is connecting or offline. Please try again in a few seconds." });
    }
    await Product.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    res.render("error", { error: error.message });
  }
};

export {
  createProductForm,
  createProduct,
  readProducts,
  readProductById,
  updateProductForm,
  updateProduct,
  deleteProduct,
};
