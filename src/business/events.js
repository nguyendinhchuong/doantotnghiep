import * as logic from "./";

export const receiveProps = nextProps => {
  const MajorId = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.IdMajor
    : 0;
  const MajorCode = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.MajorCode
    : "";
  const MajorName = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.MajorName
    : "";
  const major = { MajorId, MajorName, MajorCode };
  const LevelId = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.IdLevel
    : 0;
  const LevelName = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.LevelName
    : "";
  const level = { LevelId, LevelName };
  const ProgramId = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.IdProgram
    : 0;
  const ProgramName = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.NameProgram
    : "";
  const program = { ProgramId, ProgramName };

  const nameEduProgram = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.EduName
    : "";
  const schoolYear = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.SchoolYear
    : "";
  const EnrollmentTarget = nextProps.detailEduProgram.EnrollmentTarget
    ? nextProps.detailEduProgram.EnrollmentTarget
    : "";
  const EduProcess = nextProps.detailEduProgram.EduProcess
    ? nextProps.detailEduProgram.EduProcess
    : "";
  const GraduatedCon = nextProps.detailEduProgram.GraduatedCon
    ? nextProps.detailEduProgram.GraduatedCon
    : "";
  const IdOutcome = nextProps.detailEduProgram.IdOutcome
    ? nextProps.detailEduProgram.IdOutcome
    : 0;

  const data = {
    major,
    level,
    program,
    nameEduProgram,
    schoolYear,
    EnrollmentTarget,
    EduProcess,
    GraduatedCon,
    IdOutcome
  };
  return data;
};

export const onSaveInfo = (prop, state) => {
  const infoEduProgram = {
    ideduprog: prop.infoEduProgram ? prop.infoEduProgram.Id : 0,
    eduname: state.nameEduProgram,
    eduengname: "",
    idlevel: state.level.LevelId,
    idmajor: state.major.MajorId,
    idprogram: state.program.ProgramId,
    schoolyear: state.schoolYear,
    dateedited: new Date().toISOString()
  };
  return infoEduProgram;
};

export const onSaveDetail = (prop, state) => {
  const detailEduProgram = {
    enrollmenttarget: state.EnrollmentTarget ? state.EnrollmentTarget : "",
    eduprocess: state.EduProcess ? state.EduProcess : "",
    graduatedcon: state.GraduatedCon ? state.GraduatedCon : "",
    ideduprogram: prop.infoEduProgram ? prop.infoEduProgram.Id : 0,
    dateedited: new Date().toISOString(),
    datecreated: new Date().toISOString(),
    idoutcome: state.IdOutcome
  };
  return detailEduProgram;
};

export const onSaveTarget = (prop, targetNodes) => {
  let data = [];
  let level = logic.getMaxLevel(targetNodes);
  logic.createSaveData(targetNodes, data, 1, level);
  const targetEduProgram = {
    datecreated: new Date().toISOString(),
    iddetail: prop.detailEduProgram.Id,
    data,
    targetNodes: targetNodes
  };
  return targetEduProgram;
};
