import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as logic from "../business";
import * as message from "./message";

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
