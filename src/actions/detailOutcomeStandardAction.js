import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as logic from "../business";
import * as message from "./message";

export const saveDetailOutcomeStandardSuccess = successMessage => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const saveDetailOutcomeStandardError = (nodes, errorMessage) => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_ERROR,
  detailOutcomeStandard: nodes,
  errorMessage
});

export const onSaveDetailOutcomeStandard = (data, nodes, id) => {
  return (dispatch, getState) => {
    let link = `${links.SAVE_DETAIL_OUTCOMESTANDARD}${id}`;
    let req = { link, data };
    axios
      .post(req)
      .then(res => {
        let chirp = { message: `Lưu cây CĐR thành công`, isRight: 1 };
        dispatch(message.message(chirp));
        dispatch(saveDetailOutcomeStandardSuccess(res));
      })
      .catch(err => {
        let chirp = { message: `Lưu cây CĐR thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(saveDetailOutcomeStandardError(nodes, err));
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
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadDetailOutcomeStandardError(res));
        } else {
          let detailOutcomeStandard = logic.convertDBToTreeNode(data);
          let chirp = { message: `Tải cây CĐR thành công`, isRight: 1 };
          dispatch(message.message(chirp));
          dispatch(loadDetailOutcomeStandardSuccess(detailOutcomeStandard));
        }
      })
      .catch(err => {
        let chirp = { message: `Tải cây CĐR thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(loadDetailOutcomeStandardError(err));
      });
  };
};
