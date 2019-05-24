import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

import * as targetAction from "./_detailTargetAction";

import * as scheduleLogic from "../business/logicScheduleEdu";

export const loadScheduleProgramSuccess = scheduleNodes => ({
  type: cst.LOAD_SCHEDULE_EDUPROGRAM_SUCCESS,
  scheduleNodes
});

export const loadScheduleProgramError = errorMessage => ({
  type: cst.LOAD_SCHEDULE_EDUPROGRAM_ERROR,
  errorMessage
});

export const onloadScheduleProgram = idDetail => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_SCHEDULE_EDUPROGRAM}?iddetailedu=${idDetail}`;
    axios
      .get(req)
      .then(res => {
        const data = res.data.data;
        const scheduleNodes = scheduleLogic.mapSubjectsToScheduleNodes(
          data,
          getState().subjects
        );

        if (scheduleNodes) {
          dispatch(loadScheduleProgramSuccess(scheduleNodes));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadScheduleProgramError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải kế hoạch giảng dạy thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadScheduleProgramError(err));
      });
  };
};

export const saveScheduleProgramSuccess = successMessage => ({
  type: cst.SAVE_SCHEDULE_EDUPROGRAM_SUCCESS,
  successMessage
});

export const saveScheduleProgramError = errorMessage => ({
  type: cst.SAVE_SCHEDULE_EDUPROGRAM_ERROR,
  errorMessage
});

export const onSaveScheduleProgram = data => {
  return (dispatch, getState) => {
    let req = `${links.SAVE_SCHEDULE_EDUPROGRAM}?iddetailedu=${
      data.scheduleProgram.iddetail
    }`;
    let params = {};
    params.data = JSON.stringify(data.scheduleProgram.scheduleNodes);
    axios
      .post(req, params, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          dispatch(targetAction.onSaveTargetProgram(data));
          dispatch(saveScheduleProgramSuccess(res));
        } else {
          let chirp = {
            message: `Lưu CTĐT thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          chirp = {
            message: `Lưu kế hoạch giảng dạy CTĐT thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(saveScheduleProgramError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Lưu CTĐT thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        chirp = {
          message: `Lưu kế hoạch giảng dạy CTĐT thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(saveScheduleProgramError(err));
      });
  };
};
