import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";

export const saveThisOutcomeStandardSuccess = successMessage => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const saveThisOutcomeStandardError = errorMessage => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onSaveThisOutcomeStandard = (data, id) => {
  return (dispatch, getState) => {
    let link = `${links.SAVE_DETAIL_OUTCOMESTANDARD}${id}`;
    let req = { link, data };
    axios
      .post(req)
      .then(res => {
        dispatch(saveThisOutcomeStandardSuccess(res));
      })
      .catch(err => {
        dispatch(saveThisOutcomeStandardError(err));
      });
  };
};
