import axios from "axios";
import * as cst from "../constants";

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
    let req = `${cst.LINK}/outcomeStandards`;
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
