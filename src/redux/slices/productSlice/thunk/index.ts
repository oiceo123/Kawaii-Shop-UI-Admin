import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api";
import type { ProductRes, ProductFilter } from "../../../../types/Product";

export const fetchProducts = createAsyncThunk<ProductRes, ProductFilter>(
  "product/fetchProducts",
  async ({
    search = "",
    page = 1,
    limit = 10,
    order_by = "price",
    sort = "ASC",
  }) => {
    const res = await axios.get("/products", {
      params: { search, page, limit, order_by, sort },
    });
    return res.data;
  }
);
