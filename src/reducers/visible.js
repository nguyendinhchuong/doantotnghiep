import * as types from "../constants";

export const visible = (state = {}, action) => {
  switch (action.type) {
    case types.VISIBLE:
      return action.visible;
    default:
      return state;
  }
};
