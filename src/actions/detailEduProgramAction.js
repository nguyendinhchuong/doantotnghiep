import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";
import * as contentAction from "./_detailContentAction";
import * as scheduleAction from "./_detailScheduleAction";
import * as targetAction from "./_detailTargetAction";

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
          // where to put actions LOL
          dispatch(contentAction.onLoadContentProgram(detailEduProgram.Id));
          dispatch(scheduleAction.onloadScheduleProgram(detailEduProgram.Id));
          dispatch(targetAction.onLoadTargetProgram(detailEduProgram.Id));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadDetailEduProgramError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải chi tiết CTĐT thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadDetailEduProgramError(err));
      });
  };
};

export const onLoadDetailEduProgramAfterSave = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_DETAIL_EDUPROGRAM}?ideduprog=${id}`;
    axios
      .get(req)
      .then(res => {
        const detailEduProgram = res.data.data;
        if (detailEduProgram) {
          dispatch(loadDetailEduProgramSuccess(detailEduProgram));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadDetailEduProgramError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải chi tiết CTĐT thất bại`,
          isRight: 0
        };
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
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          let chirp = {
            message: `Lưu chi tiết CTĐT thành công`,
            isRight: 1
          };
          // where to put actions LOL
          dispatch(contentAction.onSaveContentProgram(data.contentProgram));
          // dispatch(scheduleAction.onSaveScheduleProgram(data.scheduleProgram));
          // dispatch(targetAction.onSaveTargetProgram(data.targetProgram));

          // dispatch(message.message(chirp));
          // dispatch(
          //   onLoadDetailEduProgramAfterSave(data.detailEduProgram.ideduprogram)
          // );
          dispatch(saveDetailEduProgramSuccess(res));
        } else {
          let chirp = {
            message: `Lưu chi tiết CTĐT thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(onLoadDetailEduProgram(data.detailEduProgram.ideduprogram));
          dispatch(saveDetailEduProgramError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Lưu chi tiết CTĐT thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(onLoadDetailEduProgram(data.detailEduProgram.ideduprogram));
        dispatch(saveDetailEduProgramError(err));
      });
  };
};
