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
    let req = links.LOAD_ALL_FACULTIES;
    axios
      .get(req)
      .then(res => {
        const faculties = res.data;
        if (faculties === undefined) {
          dispatch(loadFacultiesError("Do not have data"));
          //
          dispatch(message.message("Chưa có dữ liệu"));
        } else {
          dispatch(loadFacultiesSuccess(faculties));
        }
      })
      .catch(err => {
        dispatch(loadFacultiesError(err));
        //
        dispatch(message.message("Lỗi đường chuyền"));
      });
  };
};
