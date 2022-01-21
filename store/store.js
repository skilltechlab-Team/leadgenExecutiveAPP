import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';
import userAuth from './reducers/userAuth'
import usersList from './reducers/usersList'
import examList from "./reducers/examList";
import leadList from "./reducers/leadList";
import examStatus from "./reducers/examStatus";
import paymentStatus from "./reducers/paymentStatus";
const composeEnhancers = composeWithDevTools({
  trace: true
});
const rootReducer = combineReducers({
  auth: userAuth,
  users: usersList,
  exam: examList,
  leadList: leadList,
  examStatus: examStatus,
  paymentStatus: paymentStatus
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})
export default store;
