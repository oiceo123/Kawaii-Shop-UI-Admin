import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../../api";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const res = await axios.get("/users/admin/profiles");
  return res.data;
});
