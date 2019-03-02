import * as types from "../constants";

export const outcomeStandards = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_OUTCOMESTANDARDS:
      return {
        ...action.outcomeStandards
      };
    default:
      return state;
  }
};
