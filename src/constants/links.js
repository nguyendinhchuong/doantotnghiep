export const LINK = "http://localhost:3001";

// levels links
export const LOAD_LEVELS = `${LINK}/level/getlist/`;

// majors links
export const LOAD_MAJORS = `${LINK}/major/getlist/`;

// faculties links
export const LOAD_FACULTIES = `${LINK}/getfacultyinfo/`;

// programs links
export const LOAD_PROGRAMS = `${LINK}/getprograminfo/`;

// eduPrograms links
export const LOAD_EDUPROGRAMS = `${LINK}/eduprogram/getlist/`;
export const ADD_EDUPROGRAM = `${LINK}/eduprogram/add/`;
export const LOAD_EDUPROGRAM = `${LINK}/eduprogram/getbyid/`;

// detail eduProgram links
export const LOAD_DETAIL_EDUPROGRAM = `${LINK}/detaileduprogram/get/`;
export const LOAD_TARGET_EDUPROGRAM = `${LINK}/edupurpose/get/`;

// subjects links
export const LOAD_SUBJECTS = `${LINK}/subject/getlist/`;
export const ADD_SUBJECT = `${LINK}/subject/add/`;
export const ADD_SUBJECT_BULK = `${LINK}/subject/addlist/`;
export const DELETE_SUBJECT = `${LINK}/subject/delete/`;
export const LOAD_USING_EDUPRO = `${LINK}/subjecteduprog/geteduprog/`;

// outcomeStandards links
export const LOAD_OUTCOMESTANDARDS = `${LINK}/getoutcomestandard`;
export const LOAD_OUTCOMESTANDARD = `${LINK}/getoutcomestandardinfo`;
export const ADD_OUTCOMESTANDARD = `${LINK}/addoutcomestandard`;
export const DELETE_OUTCOMESTANDARD = `${LINK}/deleteoutcomestandard`;

// detailOutcomeStandard links
export const LOAD_DETAIL_OUTCOMESTANDARD = `${LINK}/getdetailoutcomestandard`;
export const DELETE_DETAIL_OUTCOMESTANDARD = `${LINK}/deldetailoutcomestandard`;
export const ADD_DETAIL_OUTCOMESTANDARD = `${LINK}/adddetailoutcomestandard`;

// revisions links
export const LOAD_REVISIONS = `${LINK}/getrevision`;
export const ADD_REVISION = `${LINK}/addrevision`;
export const DELETE_REVISION = `${LINK}/deleterevision`;

// detailOutcomeStandard links
export const LOAD_DETAIL_REVISION = `${LINK}/getdetailrevision`;
export const ADD_DETAIL_REVISION = `${LINK}/adddetailrevision`;
