import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <ul className="flex space-x-20 px-6 py-2 bg-yellow-400 rounded-md">
      <li className="text-xl font-medium hover:font-extrabold">
        <Link to="/orders"> Orders</Link>
      </li>
      <li className="text-xl font-medium hover:font-extrabold">
        <Link to="/products"> Products</Link>
      </li>
    </ul>
  );
}
