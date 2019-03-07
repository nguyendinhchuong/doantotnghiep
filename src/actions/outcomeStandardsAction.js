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
  errorMessage
});

export const onLoadOutcomeStandards = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_OUTCOMESTANDARDS;
    axios
      .get(req)
      .then(res => {
        const outcomeStandards = res.data;
        if (outcomeStandards === undefined) {
          dispatch(loadOutcomeStandardsError(res));
          dispatch(message.message(new String(`Chưa có dữ liệu`)));
        } else {
          dispatch(loadOutcomeStandardsSuccess(outcomeStandards));
          dispatch(message.message(new String(`Tải các CĐR thành công`)));
        }
      })
      .catch(err => {
        dispatch(loadOutcomeStandardsError(err));
        dispatch(message.message(new String(`Tải các CĐR thất bại`)));
      });
  };
};

export const deleteOutcomeStandardSuccess = successMessage => ({
  type: cst.DELETE_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const deleteOutcomeStandardError = errorMessage => ({
  type: cst.DELETE_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onDeleteOutcomeStandard = id => {
  return (dispatch, getState) => {
    let req = `${links.DELETE_OUTCOMESTANDARD}${id}`;
    axios
      .post(req)
      .then(res => {
        dispatch(deleteOutcomeStandardSuccess(res));
        dispatch(onLoadOutcomeStandards());
        dispatch(message.message(new String(`Xóa CĐR thành công`)));
      })
      .catch(err => {
        dispatch(deleteOutcomeStandardError(err));
        dispatch(message.message(new String(`Xóa CĐR thất bại`)));
      });
  };
};
