const { Product } = require("../models/product.model");

const createProduct = (req, res) => {
  try {
    const { name, category, unit_price } = req.body;

    const newProduct = new Product({
      name,
      category,
      unit_price,
    });

    newProduct.save();

    res.status(201).json({
      status: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find({ status: "active" });

    res.status(200).json({
      status: "Products found successfully",
      data: products,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    res.status(200).json({
      status: "Product found successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { unit_price } = req.body;

    const product = await Product.findOne({ _id: id, status: "active" });

    if (!product) {
      return res.status(404).json({
        status: "Product not ",
      });
    }

    product.unit_price = unit_price;

    await product.save();

    res.status(200).json({
      status: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id, status: "active" });

    if (!product) {
      return res.status(404).json({
        status: "Product not ",
      });
    }

    product.status = "inactive";

    await product.save();

    res.status(403).json({
      status: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
