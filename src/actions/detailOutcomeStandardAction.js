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
        dispatch(message.message("Success"));
      })
      .catch(err => {
        dispatch(saveThisOutcomeStandardError(err));
        //
        dispatch(message.message(err));
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