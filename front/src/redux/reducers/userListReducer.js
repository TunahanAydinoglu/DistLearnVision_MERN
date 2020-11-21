import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function userListReducer(state = initialState.users, action) {
  let newState = state;

  switch (action.type) {
    case actionTypes.GET_ALL_USERS:
      newState = action.payload;
      return newState;

    default:
      return newState;
  }
}