import * as actionTypes from "./actionTypes";

export function getAllUsers(users) {
  return {
    type: actionTypes.GET_ALL_USERS,
    payload: users,
  };
}
