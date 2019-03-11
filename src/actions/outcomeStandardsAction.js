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
        const outcomeStandards = res.data.data;
        if (outcomeStandards === undefined) {
          dispatch(message.isRight(0));
          dispatch(loadOutcomeStandardsError(res));
          dispatch(message.message(new String(`Chưa có dữ liệu`)));
        } else {
          dispatch(message.isRight(1));
          dispatch(loadOutcomeStandardsSuccess(outcomeStandards));
          dispatch(message.message(new String(`Tải các CĐR thành công`)));
        }
      })
      .catch(err => {
        dispatch(message.isRight(0));
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
        dispatch(message.isRight(1));
        dispatch(deleteOutcomeStandardSuccess(res));
        dispatch(onLoadOutcomeStandards());
        dispatch(message.message(new String(`Xóa CĐR thành công`)));
      })
      .catch(err => {
        dispatch(message.isRight(0));
        dispatch(deleteOutcomeStandardError(err));
        dispatch(message.message(new String(`Xóa CĐR thất bại`)));
      });
  };
};

export const addOutcomeStandardSuccess = successMessage => ({
  type: cst.ADD_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const addOutcomeStandardError = errorMessage => ({
  type: cst.ADD_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onAddOutcomeStandard = data => {
  return (dispatch, getState) => {
    let link = `${links.ADD_OUTCOMESTANDARD}`;
    let req = { link, data };
    axios
      .post(req)
      .then(res => {
        dispatch(message.isRight(1));
        dispatch(addOutcomeStandardSuccess(res));
        dispatch(onLoadOutcomeStandards());
        dispatch(message.message(new String(`Tạo CĐR thành công`)));
      })
      .catch(err => {
        dispatch(message.isRight(0));
        dispatch(addOutcomeStandardError(err));
        dispatch(message.message(new String(`Tạo CĐR thất bại`)));
      });
  };
};

export const loadOutcomeStandardSuccess = infoOutcomeStandard => ({
  type: cst.LOAD_OUTCOMESTANDARD_SUCCESS,
  infoOutcomeStandard: infoOutcomeStandard
});

export const loadOutcomeStandardError = errorMessage => ({
  type: cst.LOAD_OUTCOMESTANDARD_ERROR,
  infoOutcomeStandard: {}
});

export const onLoadOutcomeStandard = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_OUTCOMESTANDARD}?idoutcome=${id}`;
    axios
      .get(req)
      .then(res => {
        const infoOutcomeStandard = res.data;
        if (infoOutcomeStandard === undefined) {
          dispatch(message.isRight(0));
          dispatch(loadOutcomeStandardError(res));
          dispatch(message.message(new String(`Chưa có dữ liệu`)));
        } else {
          dispatch(message.isRight(1));
          dispatch(loadOutcomeStandardSuccess(infoOutcomeStandard));
          dispatch(message.message(new String(`Tải CĐR thành công`)));
        }
      })
      .catch(err => {
        dispatch(message.isRight(0));
        dispatch(loadOutcomeStandardError(err));
        dispatch(message.message(new String(`Tải CĐR thất bại`)));
      });
  };
};
