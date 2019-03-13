import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as logic from "../business";
import * as message from "./message";

export const addDetailRevisionSuccess = (nodes, successMessage) => ({
  type: cst.ADD_DETAIL_REVISION_SUCCESS,
  detailOutcomeStandard: nodes,
  successMessage
});

export const addDetailRevisionError = (nodes, errorMessage) => ({
  type: cst.ADD_DETAIL_REVISION_ERROR,
  detailOutcomeStandard: nodes,
  errorMessage
});

export const onAddDetailRevision = (data, nodes, info) => {
  return (dispatch, getState) => {
    let link = `${links.ADD_DETAIL_REVISION}$?IdOutcome=${info.IdOutcome}
    &IdUser=${info.IdUser}&Name=${info.Name}&DateUpdated=${info.DateUpdated}`;
    let req = { link, data };
    axios
      .post(req)
      .then(res => {
        let chirp = { message: `Lưu phiên bản của cây CĐR thành công`, isRight: 1 };
        dispatch(message.message(chirp));
        dispatch(addDetailRevisionSuccess(nodes, res));
      })
      .catch(err => {
        let chirp = { message: `Lưu phiên bản của cây CĐR thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(addDetailRevisionError(nodes, err));
      });
  };
};

export const loadDetailRevisionSuccess = detailRevision => ({
  type: cst.LOAD_DETAIL_REVISION_SUCCESS,
  detailOutcomeStandard: detailRevision
});

export const loadDetailRevisionError = errorMessage => ({
  type: cst.LOAD_DETAIL_REVISION_ERROR,
  errorMessage
});

export const onLoadDetailRevision = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_DETAIL_REVISION}?idrevision=${id}`;
    axios
      .get(req)
      .then(res => {
        const data = res.data.data;
        if (data === undefined) {
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadDetailRevisionError(res));
        } else {
          let detailRevision = logic.convertDBToTreeNode(data);
          let chirp = { message: `Tải phiên bản của cây CĐR thành công`, isRight: 1 };
          dispatch(message.message(chirp));
          dispatch(loadDetailRevisionSuccess(detailRevision));
        }
      })
      .catch(err => {
        let chirp = { message: `Tải phiên bản của cây CĐR thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(loadDetailRevisionError(err));
      });
  };
};
