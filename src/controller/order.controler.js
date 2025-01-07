const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");

const getOrder = async (req, res) => {
  try {
    const order = await orderModel.find();
    res.status(200).json({
      message: "Order product successfully",
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!!", status: false });
  }
};

const getOrderId = async (req, res) => {
  try {
    const { userId, product, totalAmout } = req.body;
    // Validate request data
    if (
      !userId ||
      !product ||
      product.length === 0 ||
      totalAmout === undefined
    ) {
      return res.status(400).json({ message: "Invalid request data!" });
    }
    // Validate stock and update products atomically
    for (const item of product) {
      const productInDB = await productModel.findById(item.productId);
      if (!productInDB) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }
      if (productInDB.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${productInDB.name}`,
        });
      }
      // Deduct stock
      await productModel.findByIdAndUpdate(
        item.productId,
        { $inc: { quantity: -item.quantity } }, // Decrease stock atomically
        { new: true }
      );
    }
    // Create the new order
    const order = new orderModel({ userId, product, totalAmout });
    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order created successfully!",
      status: true,
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", status: false, error });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = body.params;
    const order = await orderModel.findByIdAndUpdate(id, req.body);
    if (!order) {
      return res.status(404).json({ message: "Not found order id" });
    }
    res.status(200).json({
      message: "Update order successfully!",
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", status: fales });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = body.params;
    const order = orderModel.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "Id order not found" });
    }
    res.status(200).json({
      message: "remove order successfully!",
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", status: fales });
  }
};

module.exports = {
  getOrder,
  getOrderId,
  updateOrder,
  deleteOrder,
};
