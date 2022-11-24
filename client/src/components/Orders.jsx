import { Table, Button } from "react-bootstrap";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { store } from "../app/store";
import { getOrderThunk } from "../features/orders/orderSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderThunk());
  }, [orders]);

  const openModal = (order) => {
    const Modal = lazy(() => import("./OrderModal"));
    const modalDiv = document.createElement("div");
    modalDiv.id = "order-modal";

    document.body.appendChild(modalDiv);
    const root = createRoot(modalDiv);

    root.render(
      <Provider store={store}>
        <Suspense fallback={<div>...Loading</div>}>
          <Modal root={root} order={order} />
        </Suspense>
      </Provider>
    );
  };

  return (
    <div
      className="w-full h-[60vh] flex flex-col items-center py-6 justify-start gap-2 space-y-6">
      <h4 className="text-2xl font-medium">Orders</h4>

      <Button
        onClick={() => {openModal()}}
        className="bg-slate-600 px-6 py-2 rounded-lg text-[white] border-2 border-[bg-slate-600] 
        font-medium ml-[65%] hover:bg-white hover:border-2 hover:border-[black] hover:text-[black]">
        Create Order
      </Button>

      <Table striped bordered hover className="w-[80%]">
        <thead className="bg-blue-300 border-[gray] border-[1px]">
          <tr>
            <th>N°</th>
            <th>Consumer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center border-[gray] border-[1px]">
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>{order.date.slice(0, 10)}</td>
              <td>{order.total_amount}</td>
              <td className="space-x-2">
                <button
                  onClick={() => {openModal(order)}}
                  className="font-semibold hover:bg-[white] hover:border-[black] 
                border-[1px] py-2 bg-red-400 px-2 rounded-lg">
                  Edit
                </button>
                <button
                  className="font-semibold hover:bg-[white] hover:border-[black] border-[1px] 
                  py-2 bg-red-400 px-2 rounded-lg">
                  <Link to={`/orders/${order._id}`}>Details</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
