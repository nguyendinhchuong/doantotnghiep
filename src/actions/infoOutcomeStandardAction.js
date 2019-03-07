import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadInfoOutcomeStandardSuccess = infoOutcomeStandard => ({
  type: cst.LOAD_INFO_OUTCOMESTANDARD_SUCCESS,
  infoOutcomeStandard: infoOutcomeStandard
});

export const loadInfoOutcomeStandardError = errorMessage => ({
  type: cst.LOAD_INFO_OUTCOMESTANDARD_ERROR,
  infoOutcomeStandard: {}
});

export const onLoadInfoOutcomeStandard = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_INFO_OUTCOMESTANDARD}${id}`;
    axios
      .get(req)
      .then(res => {
        const infoOutcomeStandard = res.data;
        if (infoOutcomeStandard === undefined) {
          dispatch(loadInfoOutcomeStandardError(res));
          dispatch(message.message(new String(`Chưa có dữ liệu`)));
        } else {
          dispatch(loadInfoOutcomeStandardSuccess(infoOutcomeStandard));
          dispatch(message.message(new String(`Tải thông tin CĐR thành công`)));
        }
      })
      .catch(err => {
        dispatch(loadInfoOutcomeStandardError(err));
        dispatch(message.message(new String(`Tải thông tin CĐR thất bại`)));
      });
  };
};

export const createInfoOutcomeStandardSuccess = successMessage => ({
  type: cst.CREATE_INFO_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const createInfoOutcomeStandardError = errorMessage => ({
  type: cst.CREATE_INFO_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onCreateInfoOutcomeStandard = data => {
  return (dispatch, getState) => {
    let link = `${links.CREATE_INFO_OUTCOMESTANDARD}`;
    let req = { link, data };
    axios
      .post(req)
      .then(res => {
        dispatch(createInfoOutcomeStandardSuccess(res));
        dispatch(message.message(new String(`Tạo thông tin CĐR thành công`)));
      })
      .catch(err => {
        dispatch(createInfoOutcomeStandardError(err));
        dispatch(message.message(new String(`Tạo thông tin CĐR thất bại`)));
      });
  };
};
