import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function OrderDetails({ selectedOrder }) {
  const [order, setOrder] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:4000/orders/${selectedOrder._id}`)
      .then((res) => setOrder(res.data.data));
  }, [selectedOrder]);

  console.log(order);

  return (
    <div
      className="w-full h-[60vh] flex flex-col items-center 
    py-6 justify-start gap-2 space-y-6"
    >
      <h4 className="text-2xl font-medium">Order Details</h4>
      <div>
        <h6>
          {" "}
          <b>Customer:</b>
          {order.customer}
        </h6>
        <h6>
          {" "}
          <b>Status:</b>
          {order.status}
        </h6>
        <h6>
          {" "}
          <b>Date:</b>
          {order.date}
        </h6>
      </div>
      <Button
        className="bg-slate-600 px-6 py-2 rounded-lg text-[white] border-2 border-[bg-slate-600] font-medium ml-[65%]
      hover:bg-white hover:border-2 hover:border-[black] hover:text-[black]"
      >
        Back
      </Button>
      <Table striped bordered hover className="w-[80%]">
        <thead className="bg-blue-300 border-[gray] border-[1px]">
          <tr>
            <th>Order Id</th>
            <th>Product Id</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center border-[gray] border-[1px]">
          {order.order_items?.map((item) => (
            <tr>
              <td>{item.orderId}</td>
              <td>{item.productId}</td>
              <td>{item.quantity}</td>
              <td>{item.cost}</td>
              <td>
                <button className="hover:font-semibold">Edit</button>
                <button className="hover:font-semibold">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="flex flex-col space-y-3">
        <h5> <b>Subtotal:</b> {order.sub_total} </h5>
        <h5 className="text-2xl font-semibold">Taxes</h5>
        <h6> <b>Total city tax:</b> {order.taxes_amount?.city_tax} </h6>
        <h6> <b>Total country tax:</b> {order.taxes_amount?.country_tax} </h6>
        <h6> <b>Total state tax:</b> {order.taxes_amount?.state_tax} </h6>
        <h6> <b>Total federal tax:</b> {order.taxes_amount?.federal_tax} </h6>
        <h4> <b>Total Taxes</b> {order.total_taxes} </h4>
        <h4> <b className="text-2xl">Total</b> {order.total_amount} </h4>
        
      </div>
    </div>
  );
}
