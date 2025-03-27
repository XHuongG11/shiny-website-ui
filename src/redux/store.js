import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/LoginSignin/authSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
    },
})

export default store;