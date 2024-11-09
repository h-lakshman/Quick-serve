import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer, createBuisnessReducer } from "./reducer";

const store = configureStore({
  reducer: {
    reducer: reducer,
    createBuisnessReducer: createBuisnessReducer,
  },
});

export default store;
