import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadLevelsSuccess = levels => ({
  type: cst.LOAD_LEVELS_SUCCESS,
  levels: levels
});

export const loadLevelsError = errorMessage => ({
  type: cst.LOAD_LEVELS_ERROR,
  errorMessage
});

export const onLoadLevels = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_LEVELS;
    axios
      .get(req)
      .then(res => {
        const levels = res.data.data;
        if (levels === undefined) {
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadLevelsError(res));
        } else {
          dispatch(loadLevelsSuccess(levels));
        }
      })
      .catch(err => {
        let chirp = { message: `Tải các trình độ thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(loadLevelsError(err));
      });
  };
};
