import "./App.css";
import NavBar from "./components/NavBar";
import { HashRouter, Routes, Route } from "react-router-dom";
import Orders from './components/Orders'
import Products from './components/Products'
import OrderDetails from "./components/OrderDetails";
import { useState } from "react";

function App() {

const [selectedOrder, setSelectedOrder] = useState(null)

const selectOrder = (order) => {
  setSelectedOrder(order)
}

  return (
    <HashRouter>
      <div className="App py-4 px-4 flex flex-col justify-center items-center gap-4">
        <h2 className="text-5xl font-medium">Blaze</h2>
        <NavBar />
        <Routes>
          <Route path="/orders" element={<Orders selectOrder={selectOrder}/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/orders/:id" element={<OrderDetails  selectedOrder={selectedOrder}/>} />

        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
