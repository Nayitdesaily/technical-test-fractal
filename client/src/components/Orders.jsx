import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";

export default function Orders({ selectOrder }) {
  const orders = useSelector((state) => state.orders);

  return (
    <div
      className="w-full h-[60vh] flex flex-col items-center 
    py-6 justify-start gap-2 border-2 border-[black] space-y-6"
    >
      <h4 className="text-2xl font-medium">Orders</h4>
      <Button
        className="bg-slate-600 px-6 py-2 rounded-lg text-[white] border-2 border-[bg-slate-600] font-medium ml-[65%]
      hover:bg-white hover:border-2 hover:border-[black] hover:text-[black]"
      >
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
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
              <td>{order.total_amount}</td>
              <td>
                <button className="font-normal hover:font-semibold">
                  Edit
                </button>

                <button
                  className="font-normal hover:font-semibold"
                  onClick={() => {
                    selectOrder(order);
                  }}
                >
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
