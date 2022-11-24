const { Order } = require("../models/order.model");
const { OrderItem } = require("../models/orderItem.model");
const { Product } = require("../models/product.model");

const createOrder = (req, res) => {
  try {
    const { customer } = req.body;

    const newOrder = new Order({
      customer,
    });

    newOrder.save();

    res.status(201).json({
      status: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ status: ["pending", "completed"] });

    res.status(200).json({
      status: "Order found successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ _id: id });

    if (!order) {
      return res.status(404).json({
        status: "Order not found",
      });
    }

    res.status(200).json({
      status: "Order found successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCompletedOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ _id: id });

    if (!order) {
      return res.status(404).json({
        status: "Order not found",
      });
    }

    order.status = "completed";

    await order.save();

    res.status(200).json({
      status: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer } = req.body;

    const order = await Order.findOne({ _id: id });

    if (!order) {
      return res.status(404).json({
        status: "Order not found",
      });
    }

    order.customer = customer;

    await order.save();

    res.status(200).json({
      status: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ _id: id });

    if (!order) {
      return res.status(404).json({
        status: "Order not found",
      });
    }

    order.status = "rejected";

    await order.save();

    res.status(403).json({
      status: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const createOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, quantity } = req.body;

    const order = await Order.findOne({ _id: id, status: "pending" });

    if (!order) {
      return res.status(404).json({
        status: "Order not found",
      });
    }

    const product = await Product.findOne({
      name: productName,
      status: "active",
    });

    if (!product) {
      return res.status(404).json({
        status: "Product not found",
      });
    }

    const newOrderItem = new OrderItem({
      quantity,
      cost: quantity * product.unit_price,
      orderId: order._id,
      productId: product._id,
    });

    const savedOrderItem = await newOrderItem.save();

    order.order_items.push(savedOrderItem);
    order.sub_total = order.order_items.reduce((acc, el) => acc + el.cost, 0);
    order.taxes_amount.city_tax = (order.sub_total * 0.1).toFixed(2);

    order.taxes_amount.country_tax = (
      (order.sub_total + order.taxes_amount.city_tax) *
      0.05
    ).toFixed(2);

    order.taxes_amount.state_tax = (
      (order.sub_total +
        order.taxes_amount.city_tax +
        order.taxes_amount.country_tax) *
      0.08
    ).toFixed(2);

    order.taxes_amount.federal_tax = (
      (order.sub_total +
        order.taxes_amount.city_tax +
        order.taxes_amount.country_tax +
        order.taxes_amount.state_tax) *
      0.02
    ).toFixed(2);

    order.total_taxes = Object.values(order.taxes_amount)
      .reduce((acc, el) => acc + el)
      .toFixed(2);

    order.total_amount = order.sub_total + order.total_taxes;

    await order.save();

    res.status(201).json({
      status: "Order item created successfully",
      data: savedOrderItem,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findOne({ _id: id });

    if (!orderItem) {
      return res.status(404).json({
        status: "Order item not found",
      });
    }

    const order = await Order.findOne({ _id: orderItem.orderId });

    if (!order) {
      return res.status(404).json({
        status: "Order not found",
      });
    }

    const order_items = order.order_items.filter(
      (item) => item._id.toString() !== orderItem._id.toString()
    );

    order.order_items = order_items;

    await order.save();

    res.status(200).json({
      data: {
        orderItem,
        order,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const orderItem = await OrderItem.findOne({ _id: id });

    const order = await Order.findOne({_id: orderItem.orderId})

    if (!orderItem) {
      return res.status(404).json({
        status: "Order item not found",
      });
    }

    const findOrderItem = order.order_items.find( item => item._id.toString() === orderItem._id.toString() )
    findOrderItem.quantity = quantity
    await order.save()

    res.status(200).json({
      data: {
        findOrderItem,
        order
      }
    })
  } catch (error) {
    console.log(error);
  }
};

//Item

module.exports = {
  createOrder,
  getOrder,
  createOrderItem,
  deleteOrderItem,
  updateOrderItem,
  updateCompletedOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
};
