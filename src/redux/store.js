import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
import appReducer from "./reducers/AppReducer";
// import loginReducer from "./reducers/LoginReducer";

export default configureStore({
  reducer: {
    appReducer: appReducer,
  },
});
