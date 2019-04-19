import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadFacultiesSuccess = faculties => ({
  type: cst.LOAD_FACULTIES_SUCCESS,
  faculties: faculties
});

export const loadFacultiesError = errorMessage => ({
  type: cst.LOAD_FACULTIES_ERROR,
  errorMessage
});

export const onLoadFaculties = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_FACULTIES;
    axios
      .get(req)
      .then(res => {
        const faculties = res.data.data;
        if (faculties === undefined || faculties === null) {
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadFacultiesError(res));
        } else {
          dispatch(loadFacultiesSuccess(faculties));
        }
      })
      .catch(err => {
        let chirp = { message: `Tải các khoa thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(loadFacultiesError(err));
      });
  };
};
