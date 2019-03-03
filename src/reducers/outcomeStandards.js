import * as types from "../constants";

export const outcomeStandards = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_OUTCOMESTANDARDS_SUCCESS:
      return [...action.outcomeStandards];
    default:
      return state;
  }
};
