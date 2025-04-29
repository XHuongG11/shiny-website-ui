import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/LoginSignin/store/authSlice";
import emailReducer from "../features/LoginSignin/store/emailSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    email: emailReducer,
  },
});

export default store;
