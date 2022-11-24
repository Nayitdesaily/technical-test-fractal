import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrderThunk, statusCompletedOrderThunk } from "../features/orders/orderSlice";

export default function TaxBox({ order }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteOrderThunk(id));
  };

  const handleCompletedOrder = (id) => {
    dispatch(statusCompletedOrderThunk(id))
  }

  return (
    <div className="flex flex-col space-y-3">
      <h5>
        <b>Subtotal:</b> ${order?.sub_total}
      </h5>

      <div>
        <h5 className="text-2xl font-semibold">Taxes</h5>
        <div>
          <h6>
            <b>Total city tax:</b> ${order?.taxes_amount?.city_tax}
          </h6>
          <h6>
            <b>Total country tax:</b> ${order?.taxes_amount?.country_tax}
          </h6>
          <h6>
            <b>Total state tax:</b> ${order?.taxes_amount?.state_tax}
          </h6>
          <h6>
            <b>Total federal tax:</b> ${order?.taxes_amount?.federal_tax}
          </h6>
        </div>
        <h4>
          <b>Total Taxes</b> ${order?.total_taxes}
        </h4>
      </div>

      <h4>
        <b className="text-2xl">Total</b> ${order?.total_amount}
      </h4>

      <div className="space-x-5 ">
        <button 
        onClick={() => {
            navigate('/orders')
            handleCompletedOrder(order?._id)
        }}
        className="py-2 font-semibold px-4 bg-blue-500 text-[white] rounded-lg">
          Complete Order
        </button>
        <button
          onClick={() => {
            navigate('/orders')
            handleDelete(order?._id)}}
          className="font-semibold py-2 px-4 bg-red-500 text-[white] rounded-lg"
        >
          Reject Order
        </button>
      </div>
    </div>
  );
}
