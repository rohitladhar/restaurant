import { ADD_TO_CART, INCREMENT, DECREMENT, EMPTYCART } from "./types";
import { LOGIN, LOGOUT } from "./types";
export function addCart(id, name, price, image) {
  return {
    type: ADD_TO_CART,
    payload: {
      id,
      name,
      price,
      image,
    },
  };
}

export function increment(id, name, price, image) {
  return {
    type: INCREMENT,
    payload: {
      id,
      name,
      price,
      image,
    },
  };
}
export function decrement(id, name, price, image) {
  return {
    type: DECREMENT,
    payload: {
      id,
      name,
      price,
      image,
    },
  };
}
export function emptyCart() {
  return {
    type: EMPTYCART,
    payload: {},
  };
}

export function login(email) {
  return {
    type: LOGIN,
    payload: {
      email: email,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: {},
  };
}
