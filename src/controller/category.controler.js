const categoryModel = require("../models/category.model");
const express = require("express");

const getCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error!!", status: fales });
  }
};

module.exports = getCategory;

