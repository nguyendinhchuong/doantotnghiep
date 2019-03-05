import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadOutcomeStandardsSuccess = outcomeStandards => ({
  type: cst.LOAD_OUTCOMESTANDARDS_SUCCESS,
  outcomeStandards: outcomeStandards
});

export const loadOutcomeStandardsError = errorMessage => ({
  type: cst.LOAD_OUTCOMESTANDARDS_ERROR,
  outcomeStandards: {}
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
          //
          dispatch(message.message("Chưa có dữ liệu"));
        } else {
          dispatch(loadOutcomeStandardsSuccess(outcomeStandards));
        }
      })
      .catch(err => {
        dispatch(loadOutcomeStandardsError(err));
        //
        dispatch(message.message("Lỗi đường chuyền"));
      });
  };
};

export const deleteThisOutcomeStandardSuccess = successMessage => ({
  type: cst.DELETE_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const deleteThisOutcomeStandardError = errorMessage => ({
  type: cst.DELETE_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onDeleteThisOutcomeStandard = id => {
  return (dispatch, getState) => {
    let req = `${links.DELETE_OUTCOMESTANDARD}${id}`;
    axios
      .post(req)
      .then(res => {
        dispatch(deleteThisOutcomeStandardSuccess(res));
        dispatch(onLoadOutcomeStandards());
        //
        dispatch(message.message("Xóa thành công"));
      })
      .catch(err => {
        dispatch(deleteThisOutcomeStandardError(err));
        //
        dispatch(message.message("Xóa thất bại"));
      });
  };
};
