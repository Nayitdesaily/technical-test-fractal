const express = require("express");

const orderRouters = express.Router();

//Controllers
const {
  createOrder,
  getOrder,
  createOrderItem,
  updateOrder,
  deleteOrder,
  getOrderById,
} = require("../controllers/order.controller");

orderRouters.post("/", createOrder);
orderRouters.get("/", getOrder);
orderRouters.get("/:id", getOrderById);

orderRouters.post("/order-item/:id", createOrderItem);

orderRouters.patch("/:id", updateOrder);
orderRouters.delete("/:id", deleteOrder);

module.exports = { orderRouters };
