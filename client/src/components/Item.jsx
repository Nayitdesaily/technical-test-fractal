import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { deleteItemInOrderThunk } from "../features/orders/orderSlice";

export default function Item( {item, index, openItemModal} ) {

    const [product, setProduct] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`http://localhost:4000/products/${item.productId}`)
        .then(res => setProduct(res.data.data) )
    })

    const deleteItem = (itemId) => {
      dispatch(deleteItemInOrderThunk(itemId))
    }

    return (
        <tr >
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{item.quantity}</td>
              <td>${product.unit_price}</td>
              <td>${item.cost}</td>
              <td>
                <button className="hover:font-semibold" onClick={()=> openItemModal(item, product)}>Edit</button>
                <button className="hover:font-semibold" onClick={()=> deleteItem(item._id)}>Delete</button>
              </td>
            </tr>
    )
}