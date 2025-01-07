const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  product: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        require: true,
      },
      name: { type: String, require: true },
      description: { type: String, require: true },
      price: { type: Number, require: true, min: 0 },
      quantity: { type: Number, require: true, min: 0 },
    },
  ],
  totalAmout: { type: Number, require: true },
  created: { type: Date, default: Date.now },
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
