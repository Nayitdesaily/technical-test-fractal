import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    setOrder: (state, action) => {
      const order = action.payload;
      return order 
    },
  },
});

export const getOrderThunk = () => (dispatch) => {
  return axios
    .get("http://localhost:4000/orders")
    .then((res) => dispatch(setOrder(res.data.data)));
};

export const addOrderThunk = (newOrder) => (dispatch) => {
  return axios.post("http://localhost:4000/orders", newOrder).then(() => {
    axios
      .get("http://localhost:4000/orders")
      .then((res) => dispatch(setOrder(res.data.data)));
  });
};

export const deleteOrderThunk = (id) => (dispatch) => {
  return axios.delete(`http://localhost:4000/orders/${id}`).then(() => {
    axios
      .get("http://localhost:4000/orders")
      .then((res) => dispatch(setOrder(res.data.data)));
  });
};

export const statusCompletedOrderThunk = (id) => (dispatch) => {
  return axios.patch(`http://localhost:4000/orders/completed/${id}`).then(() => {
    axios
      .get("http://localhost:4000/orders")
      .then((res) => dispatch(setOrder(res.data.data)));
  });
};

export const updateOrderThunk = (id, order ) => (dispatch) => {
  return axios.patch(`http://localhost:4000/orders/${id}`, order).then(() => {
    axios
      .get("http://localhost:4000/orders")
      .then((res) => dispatch(setOrder(res.data.data)));
  });
};


export const addItemInOrderThunk = (orderId, newItem) => (dispatch) => {
  return axios.post(`http://localhost:4000/orders/order-item/${orderId}`, newItem).then(() => {
    axios
      .get("http://localhost:4000/orders")
      .then((res) => dispatch(setOrder(res.data.data)));
  });
};

export const deleteItemInOrderThunk = (itemId) => (dispatch) => {
  return axios.delete(`http://localhost:4000/orders/order-item/${itemId}`).then(() => {
    axios
      .get("http://localhost:4000/orders")
      .then((res) => dispatch(setOrder(res.data.data)));
  });
};

export const updateItemInOrderThunk = (itemId, newItem) => (dispatch) => {
  return axios.patch(`http://localhost:4000/orders/order-item/${itemId}`, newItem).then(() => {
    axios
      .get("http://localhost:4000/orders")
      .then((res) => dispatch(setOrder(res.data.data)));
  });
};

export default orderSlice.reducer;

export const { setOrder } = orderSlice.actions;
