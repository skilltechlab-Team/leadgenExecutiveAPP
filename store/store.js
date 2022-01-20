import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';
import userAuth from './reducers/userAuth'
import usersList from './reducers/usersList'
import examList from "./reducers/examList";
const composeEnhancers = composeWithDevTools({
  trace: true
});
const rootReducer = combineReducers({
  auth: userAuth,
  users: usersList,
  exam: examList
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})
export default store;
