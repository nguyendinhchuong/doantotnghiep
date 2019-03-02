import axios from "axios";
import * as types from "../constants";

export const loadOutcomeStandardsSuccess = outcomeStandards => ({
  type: types.lOAD_OUTCOMESTANDARDS_SUCCESS,
  outcomeStandards: outcomeStandards
});

export const loadOutcomeStandardsError = errorMessage => ({
  type: types.lOAD_OUTCOMESTANDARDS_ERROR,
  errorMessage
});

export const onLoadOutcomeStandards = () => {
  return (dispatch, getState) => {
    let req = `${types.LINK}/getOutcomeStandards`;
    axios
      .get(req, { crossdomain: true })
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
