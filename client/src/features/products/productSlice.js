import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProduct: (state, action) => {
      const product = action.payload;
      return product;
    },
  },
});

export const getProductsThunk = () => dispatch => {
    return axios.get('http://localhost:4000/products')
    .then(res => dispatch(setProduct(res.data.data)))
}

export default productSlice.reducer;

export const { setProduct } = productSlice.actions;
