import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";
import * as targetLogic from "../business/logicTargetEducation";

export const loadDetailEduProgramSuccess = detailEduProgram => ({
  type: cst.LOAD_DETAIL_EDUPROGRAM_SUCCESS,
  detailEduProgram: detailEduProgram
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
        if (detailEduProgram === undefined || detailEduProgram === null) {
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadDetailEduProgramError(res));
        } else {
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

export const saveDetailEduProgramSuccess = successMessage => ({
  type: cst.SAVE_DETAIL_EDUPROGRAM_SUCCESS,
  successMessage
});

export const saveDetailEduProgramError = errorMessage => ({
  type: cst.SAVE_DETAIL_EDUPROGRAM_ERROR,
  errorMessage
});

export const onSaveDetailEduProgram = (detailEduProgram, targetEduProgram) => {
  return (dispatch, getState) => {
    let req = `${links.SAVE_DETAIL_EDUPROGRAM}?ideduprogram=${
      detailEduProgram.ideduprogram
    }`;
    let params = {};
    params.data = JSON.stringify(detailEduProgram);
    axios
      .post(req, params, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        if (res.data.code === 1) {
          let chirp = { message: `Lưu chi tiết CTĐT thành công`, isRight: 1 };
          dispatch(message.message(chirp));
          dispatch(onLoadDetailEduProgram(detailEduProgram.ideduprogram));
          dispatch(onSaveTargetEduProgram(targetEduProgram));
          dispatch(saveDetailEduProgramSuccess(res));
        } else {
          let chirp = { message: `Lưu chi tiết CTĐT thất bại`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(onLoadDetailEduProgram(detailEduProgram.ideduprogram));
          dispatch(saveDetailEduProgramError(res));
        }
      })
      .catch(err => {
        let chirp = { message: `Lưu chi tiết CTĐT thành công`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(onLoadDetailEduProgram(detailEduProgram.ideduprogram));
        dispatch(saveDetailEduProgramError(err));
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
        if (data === undefined || data === null) {
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadTargetEduProgramError(res));
        } else {
          let targetEduProgram = targetLogic.convertDBToTreeNodeForEduPro(data);
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

export const saveTargetEduProgramSuccess = (
  targetEduProgram,
  successMessage
) => ({
  type: cst.SAVE_TARGET_EDUPROGRAM_SUCCESS,
  targetEduProgram: targetEduProgram,
  successMessage
});

export const saveTargetEduProgramError = (targetEduProgram, errorMessage) => ({
  type: cst.SAVE_TARGET_EDUPROGRAM_ERROR,
  targetEduProgram: targetEduProgram,
  errorMessage
});

export const onSaveTargetEduProgram = targetEduProgram => {
  return (dispatch, getState) => {
    let req = `${links.SAVE_TARGET_EDUPROGRAM}?iddetail=${
      targetEduProgram.iddetail
    }&datecreated=${targetEduProgram.datecreated}`;
    let params = {};
    params.data = JSON.stringify(targetEduProgram.data);
    axios
      .post(req, params, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        if (res.data.code === 1) {
          let chirp = {
            message: `Lưu mục tiêu đào tạo thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          dispatch(saveTargetEduProgramSuccess(targetEduProgram.data, res));
        } else {
          let chirp = { message: `Lưu mục tiêu đào tạo thất bại`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(saveTargetEduProgramError(targetEduProgram.data, res));
        }
      })
      .catch(err => {
        let chirp = { message: `Lưu mục tiêu đào tạo thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(saveTargetEduProgramError(targetEduProgram.data, err));
      });
  };
};
