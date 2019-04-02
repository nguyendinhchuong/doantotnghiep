import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadSubjectsSuccess = subjects => ({
  type: cst.LOAD_SUBJECTS_SUCCESS,
  subjects: subjects
});

export const loadSubjectsError = errorMessage => ({
  type: cst.LOAD_SUBJECTS_ERROR,
  errorMessage
});

export const onLoadSubjects = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_SUBJECTS;
    axios
      .get(req)
      .then(res => {
        const subjects = res.data.data;
        if (subjects === undefined) {
          let chirp = { message: `Chưa có dữ liệu`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(loadSubjectsError(res));
        } else {
          let chirp = { message: `Tải các môn học thành công`, isRight: 1 };
          dispatch(message.message(chirp));
          dispatch(loadSubjectsSuccess(subjects));
        }
      })
      .catch(err => {
        let chirp = { message: `Tải các môn học thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(loadSubjectsError(err));
      });
  };
};

export const addSubjectSuccess = successMessage => ({
  type: cst.ADD_SUBJECT_SUCCESS,
  successMessage
});

export const addSubjectError = errorMessage => ({
  type: cst.ADD_SUBJECT_ERROR,
  errorMessage
});

export const onAddSubject = data => {
  return (dispatch, getState) => {
    // let link = `${links.ADD_SUBJECT}?subjectcode=${data.subjectcode}
    // &subjectname=${data.subjectname}&subjectengname=${data.subjectengname}
    // &credit=${data.credit}&theoryperiod=${data.theoryperiod}
    // &practiceperiod=${data.practiceperiod}&exerciseperiod=${data.exerciseperiod}
    // &description=${data.description}&datecreated=${data.datecreated}
    // &dateedited=${data.dateedited}`;

    let link = links.ADD_SUBJECT;
    let params = {};
    params.data = JSON.stringify(data);
    axios
      .post(link, params, { headers: { "Content-Type": "application/json" } })
      .then(res => {
        if (res.data.code === 1) {
          dispatch(onLoadSubjects());
          let chirp = { message: `Thêm môn học thành công`, isRight: 1 };
          dispatch(message.message(chirp));
          dispatch(addSubjectSuccess(res));
        } else {
          let chirp = { message: `Thêm môn học thất bại`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(addSubjectError(res));
        }
      })
      .catch(err => {
        let chirp = { message: `Thêm môn học thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(addSubjectError(err));
      });
  };
};

export const deleteSubjectSuccess = successMessage => ({
  type: cst.DELETE_SUBJECT_SUCCESS,
  successMessage
});

export const deleteSubjectError = errorMessage => ({
  type: cst.DELETE_SUBJECT_ERROR,
  errorMessage
});

export const onDeleteSubject = id => {
  return (dispatch, getState) => {
    let req = `${links.DELETE_SUBJECT}?idsubject=${id}`;
    axios
      .post(req)
      .then(res => {
        if (res.data.code === 1) {
          let chirp = { message: `Xóa môn học thành công`, isRight: 1 };
          dispatch(onLoadSubjects());
          dispatch(message.message(chirp));
          dispatch(deleteSubjectSuccess(res));
        } else {
          let chirp = { message: `Xóa môn thất bại`, isRight: 0 };
          dispatch(message.message(chirp));
          dispatch(deleteSubjectError(res));
        }
      })
      .catch(err => {
        let chirp = { message: `Xóa môn học thất bại`, isRight: 0 };
        dispatch(message.message(chirp));
        dispatch(deleteSubjectError(err));
      });
  };
};
