import { SET_MESSAGE, CLEAR_MESSAGE } from "../constants/actionType";

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});