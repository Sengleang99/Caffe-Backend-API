const express = require("express");
const {
  getOrder,
  getOrderId,
  updateOrder,
  deleteOrder,
} = require("../controller/order.controler");

const router = express.Router();

router.get("/", getOrder);
router.post("/", getOrderId);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
