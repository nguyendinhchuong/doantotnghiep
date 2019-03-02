import axios from "axios";
import * as types from "../constants";

export const loadFacultiesSuccess = faculties => ({
  type: types.lOAD_FACULTIES_SUCCESS,
  faculties: faculties
});

export const loadFacultiesError = errorMessage => ({
  type: types.lOAD_FACULTIES_ERROR,
  errorMessage
});

export const onLoadFaculties = () => {
  return (dispatch, getState) => {
    let req = `${types.LINK}/getFaculties`;
    axios
      .get(req, { crossdomain: true })
      .then(res => {
        const faculties = res.data;
        if (faculties === undefined) {
          dispatch(loadFacultiesError("Do not have data"));
        } else {
          dispatch(loadFacultiesSuccess(faculties));
        }
      })
      .catch(err => {
        dispatch(loadFacultiesError(err));
      });
  };
};
