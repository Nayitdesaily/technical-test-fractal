import { useEffect, useState } from "react";
import { addOrderThunk, updateOrderThunk } from "../features/orders/orderSlice";
import { useDispatch } from "react-redux";


export default function OrderModal({root, order}) {
  const [customer, setCustomer] = useState("");
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    root.unmount()
    document.querySelector("#order-modal").remove();
  };

  useEffect(() => {
    if(order !== null) {
      setCustomer(order?.customer)
    }
  },[order])

  
  const submit = (e) => {
    e.preventDefault()
    const newOrder = {
      customer
    }
    if(order != null){
      dispatch(updateOrderThunk(order._id, newOrder))
    } else {
      dispatch(addOrderThunk(newOrder))

    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center z-10 bg-[black]/40 fixed top-0 right-0">
      <div
        className="bg-[white] w-[30vw] min-h-[40vh] py-8 flex flex-col justify-center items-center gap-6
      rounded-lg relative"
      >
        <h5 className="text-2xl font-semibold">Create Order</h5>
        <form onSubmit={submit} className="flex flex-col justify-center items-center space-y-10">
          <div className="flex flex-col justify-center space-y-1">
            <label htmlFor="customer" className="text-lg font-semibold">
              Customer
            </label>
            <input
              type="text"
              id="customer"
              placeholder="Enter fullname"
              className="border-[1px] border-slate-400 rounded-lg outline-none px-2 py-1 w-[20vw]"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 border-[black] boder-2 py-2 px-5 font-medium rounded-md text-lg hover:bg-[transparent]"
          >
            {
              order != null ? 'Update' : 'Create'
            }
          </button>
        </form>
        <button
          className="absolute top-2 right-8 text-lg"
          onClick={() => handleCloseModal()}
        >
          X
        </button>
      </div>
    </div>
  );
}
