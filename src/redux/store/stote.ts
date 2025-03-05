import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import BlogApi from "../api/Blog/blogApi";
// import userReducer from "./slices/userSlice";
// import userApi from "./api/userApi";

export const store = configureStore({
  reducer: {
    // user: userReducer,
    [BlogApi.reducerPath]: BlogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BlogApi.middleware),
//   devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
