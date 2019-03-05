import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const saveThisOutcomeStandardSuccess = successMessage => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const saveThisOutcomeStandardError = errorMessage => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onSaveThisOutcomeStandard = (data, id) => {
  return (dispatch, getState) => {
    let link = `${links.SAVE_DETAIL_OUTCOMESTANDARD}${id}`;
    let req = { link, data };
    axios
      .post(req)
      .then(res => {
        dispatch(saveThisOutcomeStandardSuccess(res));
        //
        dispatch(message.message("Lưu thành công"));
      })
      .catch(err => {
        dispatch(saveThisOutcomeStandardError(err));
        //
        dispatch(message.message("Lưu thất bại"));
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
      .post(req)
      .then(res => {
        const detailOutcomeStandard = res.data;
        if (detailOutcomeStandard === undefined) {
          dispatch(loadDetailOutcomeStandardSuccess(detailOutcomeStandard));
          //
          dispatch(message.message("Chưa có dữ liệu"));
        } else {
          dispatch(loadDetailOutcomeStandardSuccess(res));
        }
      })
      .catch(err => {
        dispatch(loadDetailOutcomeStandardError(err));
        dispatch(message.message("Lỗi đường chuyền"));
      });
  };
};

// export const addThisOutcomeStandardSuccess = successMessage => ({
//   type: cst.ADD_DETAIL_OUTCOMESTANDARD_SUCCESS,
//   successMessage
// });

// export const addThisOutcomeStandardError = errorMessage => ({
//   type: cst.ADD_DETAIL_OUTCOMESTANDARD_ERROR,
//   errorMessage
// });

// export const onAddThisOutcomeStandard = (idFaculty, idProgram) => {
//   return (dispatch, getState) => {
//     let link = `${links.SAVE_DETAIL_OUTCOMESTANDARD}${idFaculty}`;
//     let req = { link };
//     axios
//       .post(req)
//       .then(res => {
//         dispatch(addThisOutcomeStandardSuccess(res));
//         //
//         dispatch(message.message("Success"));
//       })
//       .catch(err => {
//         dispatch(addThisOutcomeStandardError(err));
//         //
//         dispatch(message.message(err));
//       });
//   };
// };
