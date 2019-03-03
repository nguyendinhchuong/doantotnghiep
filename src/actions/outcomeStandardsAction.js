import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";

export const loadOutcomeStandardsSuccess = outcomeStandards => ({
  type: cst.LOAD_OUTCOMESTANDARDS_SUCCESS,
  outcomeStandards: outcomeStandards
});

export const loadOutcomeStandardsError = errorMessage => ({
  type: cst.LOAD_OUTCOMESTANDARDS_ERROR,
  errorMessage
});

export const onLoadOutcomeStandards = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_ALL_OUTCOMESTANDARDS;
    axios
      .get(req)
      .then(res => {
        const outcomeStandards = res.data;
        if (outcomeStandards === undefined) {
          dispatch(loadOutcomeStandardsError("Do not have data"));
        } else {
          dispatch(loadOutcomeStandardsSuccess(outcomeStandards));
        }
      })
      .catch(err => {
        dispatch(loadOutcomeStandardsError(err));
      });
  };
};
