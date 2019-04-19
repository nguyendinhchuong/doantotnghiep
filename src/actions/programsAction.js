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
        const programs = res.data.data;
        if (programs === undefined || programs === null) {
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadProgramsError(res));
        } else {
          dispatch(loadProgramsSuccess(programs));
        }
      })
      .catch(err => {
        let chirp = { message: `Tải các hệ thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(loadProgramsError(err));
      });
  };
};
