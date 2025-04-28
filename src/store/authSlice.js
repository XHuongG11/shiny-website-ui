import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
import StorageKeys from "../constants/storage-key";

export const login = createAsyncThunk("user/login", async (payload) => {
  // goi api
  const data = await userApi.login(payload);

  const userData = data;
  // console.log("Token: " + JSON.stringify(userData));
  // Lưu token
  localStorage.setItem(StorageKeys.TOKEN, userData.data.token);
  // console.log("Token: " + userData.data.token);

  // Lưu thông tin user
  localStorage.setItem(StorageKeys.USER, JSON.stringify(userData.data.user));
  // console.log("User: " + JSON.stringify(userData.data.user));
  console.log("User Data:", userData.data.user);
  return userData.data.user;
});
export const update = createAsyncThunk("user/update", async (payload) => {
  const data = await userApi.updateInfo(payload);
  const userData = data;
  // Lưu thông tin user
  localStorage.setItem(StorageKeys.USER, JSON.stringify(userData.data));
  return userData.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem(StorageKeys.USER);
      state.current = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
