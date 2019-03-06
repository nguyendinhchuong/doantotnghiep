import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const saveThisOutcomeStandardSuccess = successMessage => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const saveThisOutcomeStandardError = nodes => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_ERROR,
  detailOutcomeStandard: nodes
});

export const onSaveThisOutcomeStandard = (data, nodes, id) => {
  return (dispatch, getState) => {
    let link = `${links.SAVE_DETAIL_OUTCOMESTANDARD}${id}`;
    let req = { link, data };
    axios
      .post(req)
      .then(res => {
        dispatch(saveThisOutcomeStandardSuccess(res));
        //
        dispatch(message.message(new String("Lưu cây CĐR thành công")));
      })
      .catch(err => {
        dispatch(saveThisOutcomeStandardError(nodes));
        //
        dispatch(message.message(new String(`Lưu cây CĐR thất bại: ${err}`)));
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

export const onLoadThisOutcomeStandard = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_DETAIL_OUTCOMESTANDARD}${id}`;
    axios
      .get(req)
      .then(res => {
        const detailOutcomeStandard = res.data;
        if (detailOutcomeStandard === undefined) {
          dispatch(loadDetailOutcomeStandardError(res));
          //
          // dispatch(message.message(new String("Chưa có dữ liệu")));
          dispatch(message.message("error network"));
        } else {
          //
          // Code function change detailOutcomeStandard to treenode here
          //
          dispatch(loadDetailOutcomeStandardSuccess(detailOutcomeStandard));
          //
          dispatch(message.message(new String("Tải cây CĐR thành công")));
        }
      })
      .catch(err => {
        dispatch(loadDetailOutcomeStandardError(err));
        // dispatch(message.message(new String(`Lỗi đường chuyền: ${err}`)));
        dispatch(message.message("error network"));
      });
  };
};

export const addThisOutcomeStandardSuccess = successMessage => ({
  type: cst.ADD_DETAIL_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const addThisOutcomeStandardError = nodes => ({
  type: cst.ADD_DETAIL_OUTCOMESTANDARD_ERROR,
  detailOutcomeStandard: nodes
});

export const onAddThisOutcomeStandard = (data, nodes) => {
  return (dispatch, getState) => {
    let link = `${links.ADD_DETAIL_OUTCOMESTANDARD}`;
    let req = { link, data };
    axios
      .post(req)
      .then(res => {
        dispatch(addThisOutcomeStandardSuccess(res));
        //
        dispatch(message.message(new String("Thêm cây CĐR thành công")));
      })
      .catch(err => {
        dispatch(addThisOutcomeStandardError(nodes));
        //
        dispatch(message.message(new String(`Thêm cây CĐR thất bại: ${err}`)));
      });
  };
};
