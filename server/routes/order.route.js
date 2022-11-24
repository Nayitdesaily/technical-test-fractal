const express = require("express");

const orderRouters = express.Router();

//Controllers
const {
  createOrder,
  getOrder,
  createOrderItem,
  deleteOrder,
  getOrderById,
  updateCompletedOrder,
  updateOrder,
  deleteOrderItem,
} = require("../controllers/order.controller");

orderRouters.post("/", createOrder);
orderRouters.get("/", getOrder);
orderRouters.get("/:id", getOrderById);

orderRouters.post("/order-item/:id", createOrderItem);
orderRouters.delete("/order-item/:id", deleteOrderItem);

orderRouters.patch("/completed/:id", updateCompletedOrder);
orderRouters.patch("/:id", updateOrder);

orderRouters.delete("/:id", deleteOrder);

module.exports = { orderRouters };
