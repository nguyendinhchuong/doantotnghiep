import * as types from "../constants";

export const faculties = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_FACULTIES:
      return {
        ...action.faculties
      };
    default:
      return state;
  }
};
