import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


let initialState = []

await axios.get('http://localhost:4000/orders')
.then(res => {
    initialState = res.data.data
})

console.log(initialState)

export const orderSlice = createSlice({
    name: "orders",
    initialState: initialState,
    reducers: {
      
    },
  });
  
  export default orderSlice.reducer;
  
  export const {  } = orderSlice.actions;