import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import { type } from "os";

const store = configureStore({
  reducer: combineReducers({ todo: todoReducer }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
