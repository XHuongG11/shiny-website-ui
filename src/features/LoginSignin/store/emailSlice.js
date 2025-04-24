import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../../api/authApi";

export const sendEmailRegister = createAsyncThunk(
  "email/sendEmailRegister",
  async (payload) => {
    const response = await authApi.sendEmail({ email: payload });
    return response.data;
  }
);
export const sendEmailResetPassword = createAsyncThunk(
  "email/sendEmailResetPassword",
  async (payload) => {
    const response = await authApi.sendEmailResetPassword({
      email: payload.email,
      role: payload.role,
    });
    return response;
  }
);
export const verifyResetPassword = createAsyncThunk(
  "email/verifyResetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyResetPassword(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const emailSlice = createSlice({
  name: "email",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmailRegister.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendEmailRegister.pending, (state) => {
        state.loading = true;
        console.log("pending send email");
      })
      .addCase(sendEmailRegister.rejected, (state) => {
        console.log("rejected send email");
        state.loading = false;
      })
      .addCase(sendEmailResetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendEmailResetPassword.pending, (state) => {
        state.loading = true;
        console.log("pending send email");
      })
      .addCase(sendEmailResetPassword.rejected, (state) => {
        console.log("rejected verify email");
        state.loading = false;
      })
      .addCase(verifyResetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyResetPassword.pending, (state) => {
        state.loading = true;
        console.log("pending verify email");
      })
      .addCase(verifyResetPassword.rejected, (state) => {
        console.log("rejected verify email");
        state.loading = false;
      });
  },
});

// export const { sendEmailRegister } = emailSlice.actions;

export default emailSlice.reducer;
