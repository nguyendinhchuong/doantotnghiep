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
  const EnrollmentTarget = nextProps.detailEduProgram
    ? nextProps.detailEduProgram.EnrollmentTarget
    : "";
  const EduProcess = nextProps.detailEduProgram
    ? nextProps.detailEduProgram.EduProcess
    : "";
  const GraduatedCon = nextProps.detailEduProgram
    ? nextProps.detailEduProgram.GraduatedCon
    : "";
  const IdOutcome = nextProps.detailEduProgram
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
