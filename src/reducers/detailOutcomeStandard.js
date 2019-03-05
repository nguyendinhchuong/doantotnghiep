import * as types from "../constants";

export const detailOutcomeStandard = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_DETAIL_OUTCOMESTANDARD_SUCCESS:
      return action.detailOutcomeStandard;
    case types.LOAD_DETAIL_OUTCOMESTANDARD_ERROR:
      return {};
    default:
      return state;
  }
};
