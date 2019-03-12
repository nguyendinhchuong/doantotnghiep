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
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadRevisionsError(res));
        } else {
          let chirp = { message: `Tải các phiên bản thành công`, isRight: 1 };
          dispatch(message.message(chirp));
          dispatch(loadRevisionsSuccess(revisions));
        }
      })
      .catch(err => {
        let chirp = { message: `Tải các phiên bản thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(loadRevisionsError(err));
      });
  };
};
