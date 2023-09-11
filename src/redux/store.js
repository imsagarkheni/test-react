import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/auth/authSlice";
import productSlice from "../components/Products/productSlice";
import profileSlice from "../components/Profile/profileSlice";

const combineReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  getproduct: productSlice,
});

const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
