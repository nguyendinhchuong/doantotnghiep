import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const createFacultyProgramSuccess = successMessage => ({
  type: cst.CREATE_FAC_PRO_SUCCESS,
  successMessage
});

export const createFacultyProgramError = errorMessage => ({
  type: cst.CREATE_FAC_PRO_ERROR,
  errorMessage
});

export const onCreateFacultyProgram = data => {
  return (dispatch, getState) => {
    let link = `${links.CREATE_FAC_PRO}`;
    let req = { link, data };
    axios
      .post(req)
      .then(res => {
        dispatch(createFacultyProgramSuccess(res));
        //
        dispatch(message.message(new String("Tạo CĐR thành công")));
      })
      .catch(err => {
        dispatch(createFacultyProgramError(err));
        //
        dispatch(message.message(new String(`Tạo CĐR thất bại: ${err}`)));
      });
  };
};
