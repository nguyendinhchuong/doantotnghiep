import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadMajorsSuccess = majors => ({
  type: cst.LOAD_MAJORS_SUCCESS,
  majors: majors
});

export const loadMajorsError = errorMessage => ({
  type: cst.LOAD_MAJORS_ERROR,
  errorMessage
});

export const onLoadMajors = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_MAJORS;
    axios
      .get(req)
      .then(res => {
        const majors = res.data.data;
        if (majors === undefined) {
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadMajorsError(res));
        } else {
          // let chirp = { message: `Tải các môn học thành công`, isRight: 1 };
          // dispatch(message.message(chirp));
          dispatch(loadMajorsSuccess(majors));
        }
      })
      .catch(err => {
        let chirp = { message: `Tải các môn học thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(loadMajorsError(err));
      });
  };
};