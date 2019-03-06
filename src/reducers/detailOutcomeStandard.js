import * as types from "../constants";

export const detailOutcomeStandard = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_DETAIL_OUTCOMESTANDARD_SUCCESS:
      return action.detailOutcomeStandard;
    case types.LOAD_DETAIL_OUTCOMESTANDARD_ERROR:
      return [];
    case types.SAVE_DETAIL_OUTCOMESTANDARD_ERROR:
      return action.detailOutcomeStandard;
    case types.ADD_DETAIL_OUTCOMESTANDARD_ERROR:
      return action.detailOutcomeStandard;
    default:
      return state;
  }
};
