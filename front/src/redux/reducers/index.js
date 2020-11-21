import { combineReducers } from "redux";
import registerUserApiReducer from "./registerUserApiReducer";

const rootReducer = combineReducers({
  registerUserApiReducer,
});

export default rootReducer;
