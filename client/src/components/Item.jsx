import axios from "axios"
import { useEffect, useState } from "react"

export default function Item( {item, index} ) {

    const [product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:4000/products/${item.productId}`)
        .then(res => setProduct(res.data.data) )
    })

    return (
        <tr >
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{item.quantity}</td>
              <td>${product.unit_price}</td>
              <td>${item.cost}</td>
              <td>
                <button className="hover:font-semibold">Edit</button>
                <button className="hover:font-semibold">Delete</button>
              </td>
            </tr>
    )
}