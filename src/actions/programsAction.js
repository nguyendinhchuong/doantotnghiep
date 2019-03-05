import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadProgramsSuccess = programs => ({
  type: cst.LOAD_PROGRAMS_SUCCESS,
  programs: programs
});

export const loadProgramsError = errorMessage => ({
  type: cst.LOAD_PROGRAMS_ERROR,
  programs: {}
});

export const onLoadPrograms = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_ALL_PROGRAMS;
    axios
      .get(req)
      .then(res => {
        const programs = res.data;
        if (programs === undefined) {
          dispatch(loadProgramsError("Do not have data"));
          //
          dispatch(message.message("Chưa có dữ liệu"));
        } else {
          dispatch(loadProgramsSuccess(programs));
        }
      })
      .catch(err => {
        dispatch(loadProgramsError(err));
        //
        dispatch(message.message("Lỗi đường chuyền"));
      });
  };
};
