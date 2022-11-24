import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemInOrderThunk } from "../features/orders/orderSlice";

export default function ItemModal({ root, id }) {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const handleCloseModal = () => {
    root.unmount();
    document.querySelector("#item-modal").remove();
  };

  const submit = (e) => {
    e.preventDefault();
    const newItem = {
      productName,
      quantity,
    };
    dispatch(addItemInOrderThunk(id, newItem));

  };

  return (
    <div className="w-full h-screen flex justify-center items-center z-10 bg-[black]/40 fixed top-0 right-0">
      <div
        className="bg-[white] w-[30vw] min-h-[40vh] py-8 flex flex-col justify-center items-center gap-6
        rounded-lg relative"
      >
        <h5 className="text-2xl font-semibold">Add Item</h5>
        <form
          onSubmit={submit}
          className="flex flex-col justify-center items-center space-y-10"
        >
          <div className="flex flex-col justify-center space-y-1">
            <label htmlFor="customer" className="text-lg font-semibold">
              Product
            </label>
            <select
              className="border-[1px] border-slate-400border-slate-400 py-1 w-[15rem] rounded-lg outline-none"
              id="customer"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            >
              <option value="0">Select product</option>
              {products.map((product) => (
                <option value={product.name} key={product._id}>{product.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center space-y-1 ">
            <label htmlFor="customer" className="text-lg font-semibold">
              Quantity
            </label>
            <input
              type="number"
              id="customer"
              placeholder="0"
              className="border-[1px] border-slate-400 rounded-lg outline-none px-2 py-1 w-[15rem]"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 border-[black] boder-2 py-2 px-5 font-medium rounded-md text-lg hover:bg-[transparent]"
          >
            Add
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
