const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { send } = require("process");

// Get all users
const getUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register user
const createUser = async (req, res) => {
  try {
    // Required fields
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password
    const saltRounds = 10; // You can adjust this for more or less security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Register user with hashed password
    const user = await userModel.create({ ...req.body, password: hashedPassword });

    res.status(201).json({
      message: "User registered successfully!",
      status: true,
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

// Sign in user
const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Generate token
    const token = jwt.sign(
      { email: user.email, password: user.password },
      "secret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

// logout user
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error!", error: error.message });
  }
};

// Verify token
const verifyToken = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

// Get user profile (protected route)
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      status: false,
      error: error.message,
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({
      message: "User deleted successfully!",
      status: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  loginUser,
  getUserProfile,
  createUser,
  updateUser,
  deleteUser,
  verifyToken,
  logoutUser,
};
