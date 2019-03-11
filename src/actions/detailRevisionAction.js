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
          dispatch(message.isRight(0));
          dispatch(loadDetailRevisionError(res));
          dispatch(message.message(new String(`Chưa có dữ liệu`)));
        } else {
          let detailRevision = logic.convertDBToTreeNode(data);
          dispatch(message.isRight(1));
          dispatch(loadDetailRevisionSuccess(detailRevision));
          dispatch(message.message(new String(`Tải phiên bản của cây CĐR thành công`)));
        }
      })
      .catch(err => {
        dispatch(message.isRight(0));
        dispatch(loadDetailRevisionError(err));
        dispatch(message.message(new String(`Tải phiên bản của cây CĐR thất bại`)));
      });
  };
};
