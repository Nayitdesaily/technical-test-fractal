import { Table, Button } from "react-bootstrap";
import { Provider, useDispatch } from "react-redux";
import axios from "axios";
import { lazy, Suspense, useEffect, useState  } from "react";
import { Link, useParams } from "react-router-dom";
import Item from "./Item";
import TaxBox from "./TaxBox";
import { createRoot } from "react-dom/client";
import { store } from "../app/store";
import { getProductsThunk } from "../features/products/productSlice";


export default function OrderDetails() {

  let {id} = useParams()
  const [order, setOrder] = useState(null)
  const dispatch = useDispatch()


  useEffect(() => {
    axios.get(`http://localhost:4000/orders/${id}`)
    .then(res => setOrder(res.data.data))

    dispatch(getProductsThunk())
  }, [order])

  
  const openModal = () => {
    const Modal = lazy(() => import("./ItemModal"));
    const modalDiv = document.createElement("div");
    modalDiv.id = "item-modal";

    document.body.appendChild(modalDiv);
    const root = createRoot(modalDiv);

    root.render(
      <Provider store={store}>
        <Suspense fallback={<div>...Loading</div>}>
          <Modal root={root} id={id} />
        </Suspense>
      </Provider>
    );
  };



  return (
    <div
      className="w-full h-[60vh] flex flex-col items-center 
    py-6 justify-start gap-2 space-y-6"
    >
      <h4 className="text-2xl font-medium">Order Details</h4>
      <div>
        <h6>
          <b>Customer:</b>
          {order?.customer}
        </h6>
        <h6>
          <b>Status:</b>
          {order?.status}
        </h6>
        <h6>
          <b>Date:</b>
          {order?.date?.slice(0, 10)}
        </h6>
      </div>
      <Link to={"/orders"}>
        <Button
          className="bg-slate-600 px-6 py-2 rounded-lg text-[white] border-2 border-[bg-slate-600] font-medium ml-[65%]
      hover:bg-white hover:border-2 hover:border-[black] hover:text-[black]"
        >
          Back
        </Button>
      </Link>
      <Table striped bordered hover className="w-[80%]">
        <thead className="bg-blue-300 border-[gray] border-[1px]">
          <tr>
            <th>N°</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center border-[gray] border-[1px]">
          {order?.order_items?.map((item, index) => (
            <Item item={item} index={index} key={item._id} />
          ))}
        </tbody>
      </Table>

      <button
        onClick={openModal}
        className="bg-yellow-300 font-semibold py-2 px-4 rounded-lg hover:text-[white] "
      >
        Add Item+
      </button>

      <TaxBox order={order} />
    </div>
  );
}
