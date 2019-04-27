import * as types from "../constants";

export const detailEduProgram = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_DETAIL_EDUPROGRAM_SUCCESS:
      return action.detailEduProgram;
    case types.LOAD_DETAIL_EDUPROGRAM_ERROR:
      return {};
    case types.SAVE_DETAIL_EDUPROGRAM_SUCCESS:
      return action.detailEduProgram;
    case types.SAVE_DETAIL_EDUPROGRAM_ERROR:
      return action.detailEduProgram;
    default:
      return state;
  }
};
