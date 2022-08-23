import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { IUser } from "../../types";

interface userState {
  userProfile: null | IUser;
  allUsers: any[] | IUser[];
}

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const res = await axios.get(`${BASE_URL}/api/users`);
  return res.data;
});

const initialState: userState = {
  userProfile: null,
  allUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAdd: (state, action: PayloadAction<any>) => {
      state.userProfile = action.payload;
    },
    userRemove: (state) => {
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.allUsers = action.payload;
      }
    );
  },
});

export const { userAdd, userRemove } = userSlice.actions;

export default userSlice.reducer;
