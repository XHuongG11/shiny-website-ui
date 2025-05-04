import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../../api/authApi";
import userApi from "../../../api/userApi";
import StorageKeys from "../../../constants/storage-key";

export const login = createAsyncThunk("user/login", async (payload) => {
  // goi api
  const data = await userApi.login(payload);
  const userData = data;
  // Lưu token
  localStorage.setItem(StorageKeys.TOKEN, userData.data.token);
  // Lưu thông tin user
  localStorage.setItem(StorageKeys.USER, JSON.stringify(userData.data.user));
  return userData.data.user;
});
export const loginGoogle = createAsyncThunk(
  "user/loginGoogle",
  async (code, { rejectWithValue }) => {
    try {
      const response = await authApi.loginOAuth(code);
      console.log("Response từ Google:", response);
      if (response.code === "1000") {
        return rejectWithValue({
          type: "NOT_REGISTERED",
          email: response.message.split("User not found with email: ")[1],
        });
      } else if (response.code === "200" && response.data?.token) {
        localStorage.setItem(StorageKeys.TOKEN, response.data.token);
        localStorage.setItem(
          StorageKeys.USER,
          JSON.stringify(response.data.user)
        );
        return response.data;
      } else {
        return rejectWithValue({
          type: "ERROR",
          message: "Xác thực không thành công",
        });
      }
    } catch (error) {
      console.error("Lỗi xác thực:", error);
      return rejectWithValue({
        type: "ERROR",
        message: "Đã xảy ra lỗi khi xử lý xác thực",
      });
    }
  }
);

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
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
