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
  errorMessage
});

export const onLoadPrograms = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_PROGRAMS;
    axios
      .get(req)
      .then(res => {
        const programs = res.data;
        if (programs === undefined) {
          dispatch(message.isRight(0));
          dispatch(loadProgramsError(res));
          dispatch(message.message(new String(`Chưa có dữ liệu`)));
        } else {
          dispatch(message.isRight(1));
          dispatch(loadProgramsSuccess(programs));
        }
      })
      .catch(err => {
        dispatch(message.isRight(0));
        dispatch(loadProgramsError(err));
        dispatch(message.message(new String(`Tải các hệ thất bại`)));
      });
  };
};
