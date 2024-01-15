import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type authState = {
  user: User | null;
  userError: any;
  userLoading: boolean;
};

const initialState: authState = {
  user: null,
  userError: null,
  userLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.userError = null;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setUserError: (state, action) => {
      state.user = null;
      state.userError = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.userError = null;
    },
  },
});

export const { setUser, setUserLoading, setUserError, logout } =
  authSlice.actions;

export default authSlice.reducer;
