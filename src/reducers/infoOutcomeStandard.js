import * as types from "../constants";

export const infoOutcomeStandard = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_INFO_OUTCOMESTANDARD_SUCCESS:
      return [...action.infoOutcomeStandard];
    default:
      return state;
  }
};
