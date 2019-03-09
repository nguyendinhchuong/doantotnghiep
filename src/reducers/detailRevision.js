import * as types from "../constants";

export const detailRevision = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_DETAIL_REVISION_SUCCESS:
      return action.detailRevision;
    case types.LOAD_DETAIL_REVISION_ERROR:
      return [];
    case types.SAVE_DETAIL_REVISION_ERROR:
      return action.detailRevision;
    case types.ADD_DETAIL_REVISION_ERROR:
      return action.detailRevision;
    default:
      return state;
  }
};
