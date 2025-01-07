const express = require("express");
const getCategory = require("../controller/category.controler");

const router = express.Router();

router.get("/", getCategory);

module.exports = router;
