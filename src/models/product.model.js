const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true, min: 0 },
  quantity: { type: Number, require: true, min: 0 },
  categoriesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    require: true,
  },
  imageUrl: { type: String, require: false },
  created: { type: Date, default: Date.now },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
