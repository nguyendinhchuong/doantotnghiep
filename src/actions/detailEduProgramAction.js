import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadDetailEduProgramSuccess = detailEduProgram => ({
  type: cst.LOAD_DETAIL_EDUPROGRAM_SUCCESS,
  detailEduProgram
});

export const loadDetailEduProgramError = errorMessage => ({
  type: cst.LOAD_DETAIL_EDUPROGRAM_ERROR,
  errorMessage
});

export const onLoadDetailEduProgram = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_DETAIL_EDUPROGRAM}?ideduprog=${id}`;
    axios
      .get(req)
      .then(res => {
        const detailEduProgram = res.data.data;
        if (detailEduProgram) {
          dispatch(loadDetailEduProgramSuccess(detailEduProgram));
        } else {
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadDetailEduProgramError(res));
        }
      })
      .catch(err => {
        let chirp = { message: `Tải chi tiết CTĐT thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(loadDetailEduProgramError(err));
      });
  };
};

export const saveDetailEduProgramSuccess = successMessage => ({
  type: cst.SAVE_DETAIL_EDUPROGRAM_SUCCESS,
  successMessage
});

export const saveDetailEduProgramError = (detailEduProgram, errorMessage) => ({
  type: cst.SAVE_DETAIL_EDUPROGRAM_ERROR,
  errorMessage,
  detailEduProgram
});

// infoEduProgram,
// detailEduProgram,
// contentProgram,
// scheduleProgram,
// targetProgram
export const onSaveDetailEduProgram = data => {
  return (dispatch, getState) => {
    let req = `${links.SAVE_DETAIL_EDUPROGRAM}?ideduprogram=${
      data.detailEduProgram.ideduprogram
    }`;
    let params = {};
    params.data = JSON.stringify(data.detailEduProgram);
    axios
      .post(req, params, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        if (res.data.code === 1) {
          let chirp = { message: `Lưu chi tiết CTĐT thành công`, isRight: 1 };
          dispatch(message.message(chirp));
          dispatch(onLoadDetailEduProgram(data.detailEduProgram.ideduprogram));
          dispatch(saveDetailEduProgramSuccess(res));
        } else {
          let chirp = { message: `Lưu chi tiết CTĐT thất bại`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(onLoadDetailEduProgram(data.detailEduProgram.ideduprogram));
          dispatch(saveDetailEduProgramError(res));
        }
      })
      .catch(err => {
        let chirp = { message: `Lưu chi tiết CTĐT thành công`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(onLoadDetailEduProgram(data.detailEduProgram.ideduprogram));
        dispatch(saveDetailEduProgramError(err));
      });
  };
};
