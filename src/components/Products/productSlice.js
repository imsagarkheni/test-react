import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct,addProduct } from "../../redux/services/productService";

const initialState = {};

export const getProductDetail = createAsyncThunk(
  "product/list",
  async (payload) => {
    return await getProduct(payload);
  }
);
export const addProductDetails = createAsyncThunk(
  "profile/addProduct",
  async (payload) => {
    return await addProduct(payload);
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductDetail.fulfilled, (state, action) => {});
  },
});

export default productSlice.reducer;
