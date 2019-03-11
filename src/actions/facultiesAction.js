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
        if (faculties === undefined) {
          dispatch(message.isRight(0));
          dispatch(loadFacultiesError(res));
          dispatch(message.message(new String(`Chưa có dữ liệu`)));
        } else {
          dispatch(message.isRight(1));
          dispatch(loadFacultiesSuccess(faculties));
        }
      })
      .catch(err => {
        dispatch(message.isRight(0));
        dispatch(loadFacultiesError(err));
        dispatch(message.message(new String(`Tải các khoa thất bại`)));
      });
  };
};
