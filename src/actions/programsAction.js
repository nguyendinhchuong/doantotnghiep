import axios from "axios";
import * as cst from "../constants";

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
    let req = `${cst.LINK}/programs`;
    axios
      .get(req)
      .then(res => {
        const programs = res.data;
        if (programs === undefined) {
          dispatch(loadProgramsError("Do not have data"));
        } else {
          dispatch(loadProgramsSuccess(programs));
        }
      })
      .catch(err => {
        dispatch(loadProgramsError(err));
      });
  };
};
