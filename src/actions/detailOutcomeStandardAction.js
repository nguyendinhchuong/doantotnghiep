import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as logic from "../business";
import * as message from "./message";

export const addDetailOutcomeStandardSuccess = successMessage => ({
  type: cst.ADD_DETAIL_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const addDetailOutcomeStandardError = nodes => ({
  type: cst.ADD_DETAIL_OUTCOMESTANDARD_ERROR,
  detailOutcomeStandard: nodes
});

export const onAddDetailOutcomeStandard = (data, nodes, id) => {
  return (dispatch, getState) => {
    let link = `${links.ADD_DETAIL_OUTCOMESTANDARD}${id}`;
    let req = { link, data };
    axios
      .post(req)
      .then(res => {
        dispatch(message.isRight(1));
        dispatch(addDetailOutcomeStandardSuccess(res));
        dispatch(message.message(new String(`Thêm cây CĐR thành công`)));
      })
      .catch(err => {
        dispatch(message.isRight(0));
        dispatch(addDetailOutcomeStandardError(nodes));
        dispatch(message.message(new String(`Thêm cây CĐR thất bại`)));
      });
  };
};

export const saveDetailOutcomeStandardSuccess = successMessage => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const saveDetailOutcomeStandardError = nodes => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_ERROR,
  detailOutcomeStandard: nodes
});

export const onSaveDetailOutcomeStandard = (data, nodes, id) => {
  return (dispatch, getState) => {
    let link = `${links.SAVE_DETAIL_OUTCOMESTANDARD}${id}`;
    let req = { link, data };
    axios
      .post(req)
      .then(res => {
        dispatch(message.isRight(1));
        dispatch(saveDetailOutcomeStandardSuccess(res));
        dispatch(message.message(new String(`Lưu cây CĐR thành công`)));
      })
      .catch(err => {
        dispatch(message.isRight(0));
        dispatch(saveDetailOutcomeStandardError(nodes));
        dispatch(message.message(new String(`Lưu cây CĐR thất bại`)));
      });
  };
};

export const loadDetailOutcomeStandardSuccess = detailOutcomeStandard => ({
  type: cst.LOAD_DETAIL_OUTCOMESTANDARD_SUCCESS,
  detailOutcomeStandard: detailOutcomeStandard
});

export const loadDetailOutcomeStandardError = errorMessage => ({
  type: cst.LOAD_DETAIL_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onLoadDetailOutcomeStandard = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_DETAIL_OUTCOMESTANDARD}?idoutcome=${id}`;
    axios
      .get(req)
      .then(res => {
        const data = res.data;
        if (data === undefined) {
          dispatch(message.isRight(0));
          dispatch(loadDetailOutcomeStandardError(res));
          dispatch(message.message(new String(`Chưa có dữ liệu`)));
        } else {
          let detailOutcomeStandard = logic.convertDBToTreeNode(data);
          dispatch(message.isRight(1));
          dispatch(loadDetailOutcomeStandardSuccess(detailOutcomeStandard));
          dispatch(message.message(new String(`Tải cây CĐR thành công`)));
        }
      })
      .catch(err => {
        dispatch(message.isRight(0));
        dispatch(loadDetailOutcomeStandardError(err));
        dispatch(message.message(new String(`Tải cây CĐR thất bại`)));
      });
  };
};
