import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadRevisionsSuccess = Revisions => ({
  type: cst.LOAD_REVISIONS_SUCCESS,
  Revisions: Revisions
});

export const loadRevisionsError = errorMessage => ({
  type: cst.LOAD_REVISIONS_ERROR,
  errorMessage
});

export const onLoadRevisions = (idOutcomeStandard) => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_REVISIONS}${idOutcomeStandard}`;
    axios
      .get(req)
      .then(res => {
        const Revisions = res.data;
        if (Revisions === undefined) {
          dispatch(message.isRight(0));
          dispatch(loadRevisionsError(res));
          dispatch(message.message(new String(`Chưa có dữ liệu`)));
        } else {
          dispatch(message.isRight(1));
          dispatch(loadRevisionsSuccess(Revisions));
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
