const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserProfile,
  verifyToken,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controller/user.controler.js");
const auth = require("../middlewares/auth.middlewares.js");

const router = express.Router();

router.get("/", getUser); // Public route to get users
router.get("/profile", auth, getUserProfile); // Protected route to get user profile
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser); // Protected logout
router.put("/:id", auth, updateUser); // Protected update
router.delete("/:id", auth, deleteUser); // Protected delete
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

module.exports = router;
