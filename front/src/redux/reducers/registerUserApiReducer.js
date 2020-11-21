import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function registerUserApiReducer(
  state = initialState.registerUser,
  action
) {
  let newState = state;
  switch (action.type) {
    case actionTypes.REGISTER_USER:
      newState = action.payload;
      return newState;

    default:
      return newState;
  }
}
