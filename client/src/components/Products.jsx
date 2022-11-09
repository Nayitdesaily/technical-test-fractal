import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

export default function Products() {
  const products = useSelector((state) => state.products);

  return (
    <div
      className="w-full h-[60vh] flex flex-col items-center 
    py-6 justify-start gap-2 border-2 border-[black] space-y-6"
    >
      <h4 className="text-2xl font-medium">Products</h4>
      <Button
        className="bg-purple-600 px-6 py-2 rounded-lg text-[white] border-2 border-[bg-slate-600] 
        font-medium ml-[65%]
      hover:bg-white hover:border-2 hover:border-[black] hover:text-[black]"
      >
        Create Product
      </Button>
      <Table striped bordered hover className="w-[80%]">
        <thead className="bg-blue-300 border-[gray] border-[1px]">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center border-[gray] border-[1px]">
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td> {product.category} </td>
              <td> {product.unit_price} </td>
              <td>{product.status}</td>
              <td>
                <button className="font-normal hover:font-semibold hover:c">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
