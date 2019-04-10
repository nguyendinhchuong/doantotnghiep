import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as logic from "../business";
import * as message from "./message";

export const loadDetailEduProgramSuccess = detailEduProgram => ({
  type: cst.LOAD_DETAIL_EDUPROGRAM_SUCCESS,
  detailEduProgram: detailEduProgram
});

export const loadDetailEduProgramError = errorMessage => ({
  type: cst.LOAD_DETAIL_EDUPROGRAM_ERROR,
  errorMessage
});

export const onLoadDetailEduProgram= id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_DETAIL_EDUPROGRAM}?ideduprog=${id}`;
    axios
      .get(req)
      .then(res => {
        const detailEduProgram = res.data.data;
        if (detailEduProgram === undefined) {
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadDetailEduProgramError(res));
        } else {
          // let chirp = { message: `Tải cây CĐR thành công`, isRight: 1 };
          // dispatch(message.message(chirp));
          dispatch(loadDetailEduProgramSuccess(detailEduProgram));
          dispatch(onLoadTargetEduProgram(detailEduProgram.Id));
        }
      })
      .catch(err => {
        let chirp = { message: `Tải chi tiết CTĐT thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(loadDetailEduProgramError(err));
      });
  };
};

export const loadTargetEduProgramSuccess = targetEduProgram => ({
  type: cst.LOAD_TARGET_EDUPROGRAM_SUCCESS,
  targetEduProgram: targetEduProgram
});

export const loadTargetEduProgramError = errorMessage => ({
  type: cst.LOAD_TARGET_EDUPROGRAM_ERROR,
  errorMessage
});

export const onLoadTargetEduProgram = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_TARGET_EDUPROGRAM}?iddetaileduprogram=${id}`;
    axios
      .get(req)
      .then(res => {
        const data = res.data.data;
        console.log(data);
        if (data === undefined) {
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadTargetEduProgramError(res));
        } else {
          let targetEduProgram = logic.convertDBToTreeNode(data);
          // let chirp = { message: `Tải cây CĐR thành công`, isRight: 1 };
          // dispatch(message.message(chirp));
          dispatch(loadTargetEduProgramSuccess(targetEduProgram));
        }
      })
      .catch(err => {
        let chirp = { message: `Tải mục tiêu đào tạo thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(loadTargetEduProgramError(err));
      });
  };
};