import * as actionTypes from "./actionTypes";

export function registerUser(user) {
  return {
    type: actionTypes.REGISTER_USER,
    payload: user,
  };
}

export function registerUserApi(user) {
  let url = "http:localhost:5000/api/auth/register";
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function handleResponse(response) {
  if (response.ok) {
    return await response.json();
  }
  const error = await response.text();
  throw new Error(error);
}

export function handleError(error) {
  console.error("Bir hata olustu");
  throw error;
}
