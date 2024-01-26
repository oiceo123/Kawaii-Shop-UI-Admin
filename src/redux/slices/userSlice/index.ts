import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../types/User";
import { fetchUsers } from "./thunk";

type UserState = {
  users: User[];
  usersLoading: boolean;
  usersError: string;
  currentUser: User | null;
  currentUserLoading: boolean;
  currentUserError: string;
};

const initialState: UserState = {
  users: [],
  usersLoading: false,
  usersError: "",
  currentUser: null,
  currentUserLoading: false,
  currentUserError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.usersLoading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.usersLoading = false;
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.usersError = action.error.message || "";
      state.usersLoading = false;
    });
  },
});

export default userSlice.reducer;
