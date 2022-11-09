import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


let initialState = []

await axios.get('http://localhost:4000/products')
.then(res => {
    initialState = res.data.data
})

console.log(initialState)

export const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
      
    },
  });
  
  export default productSlice.reducer;
  
  export const {  } = productSlice.actions;
  