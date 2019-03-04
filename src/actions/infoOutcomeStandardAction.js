import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";

export const loadInfoOutcomeStandardSuccess = infoOutcomeStandard => ({
  type: cst.LOAD_INFO_OUTCOMESTANDARD_SUCCESS,
  infoOutcomeStandard: infoOutcomeStandard
});

export const loadInfoOutcomeStandardError = errorMessage => ({
  type: cst.LOAD_INFO_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onLoadInfoOutcomeStandard = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_INFO_OUTCOMESTANDARD}${id}`;
    axios
      .get(req)
      .then(res => {
        const infoOutcomeStandard = res.data;
        if (infoOutcomeStandard === undefined) {
          dispatch(loadInfoOutcomeStandardError("Do not have data"));
        } else {
          dispatch(loadInfoOutcomeStandardSuccess(infoOutcomeStandard));
        }
      })
      .catch(err => {
        dispatch(loadInfoOutcomeStandardError(err));
      });
  };
};
