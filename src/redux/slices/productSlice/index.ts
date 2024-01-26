import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { fetchProducts } from "./thunk";
import type { Product, ProductRes } from "../../../types/Product";

type ProductState = {
  products: Product[];
  productsLoading: boolean;
  productsError: string;
  search: string;
  page: number;
  limit: number;
  order_by: string;
  sort: string;
  total: number;
};

const initialState: ProductState = {
  products: [],
  productsLoading: false,
  productsError: "",
  search: "",
  page: 1,
  limit: 10,
  order_by: "price",
  sort: "ASC",
  total: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<ProductRes>) => {
        state.products = action.payload.data;
        state.total = action.payload.total_item;
        state.productsLoading = false;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.productsError = action.error.message || "";
      state.productsLoading = false;
    });
  },
});

export default productSlice.reducer;
