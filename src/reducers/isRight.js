import * as types from "../constants";

export const isRight = (state = {}, action) => {
  switch (action.type) {
    case types.RIGHT:
      return action.isRight;
    default:
      return state;
  }
};
