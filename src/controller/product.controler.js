const productModel = require("../models/product.model.js");

const getProducts = async (req, res) => {
  try {
    const product = await productModel.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error server!", status: fales });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(200).json({
      status: true,
      message: "Product successfully created",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", status: false });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404).json({ message: "Prodcut not found!!" });
    }
    res.status(500).json({
      message: "Product update successfully!!",
      status: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error??", status: fales });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: "Product not found!!" });
    }
    res.status(500).json({ message: "Server", status: fales, data: product });
  } catch (error) {
    res.status(500).json({ message: "Server error", status: false });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
