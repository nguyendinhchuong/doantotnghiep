import axios from "axios";
import * as types from "../constants";

export const loadProgramsSuccess = programs => ({
  type: types.lOAD_PROGRAMS_SUCCESS,
  programs: programs
});

export const loadProgramsError = errorMessage => ({
  type: types.lOAD_PROGRAMS_ERROR,
  errorMessage
});

export const onLoadPrograms = () => {
  return (dispatch, getState) => {
    let req = `${types.LINK}/getPrograms`;
    axios
      .get(req, { crossdomain: true })
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
