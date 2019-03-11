import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadRevisionsSuccess = revisions => ({
  type: cst.LOAD_REVISIONS_SUCCESS,
  revisions: revisions
});

export const loadRevisionsError = errorMessage => ({
  type: cst.LOAD_REVISIONS_ERROR,
  errorMessage
});

export const onLoadRevisions = idOutcomeStandard => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_REVISIONS}?idoutcome=${idOutcomeStandard}`;
    axios
      .get(req)
      .then(res => {
        const revisions = res.data.data;
        if (revisions === undefined) {
          dispatch(message.isRight(0));
          dispatch(loadRevisionsError(res));
          dispatch(message.message(new String(`Chưa có dữ liệu`)));
        } else {
          dispatch(message.isRight(1));
          dispatch(loadRevisionsSuccess(revisions));
          dispatch(message.message(new String(`Tải các phiên bản thành công`)));
        }
      })
      .catch(err => {
        dispatch(message.isRight(0));
        dispatch(loadRevisionsError(err));
        dispatch(message.message(new String(`Tải các phiên bản thất bại`)));
      });
  };
};
