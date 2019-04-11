import { combineReducers } from "redux";
import { message } from "./message";
import { faculties } from "./faculties";
import { programs } from "./programs";
import { subjects } from "./subjects";
import { usingEduPro } from "./usingEduPro";
import { outcomeStandards } from "./outcomeStandards";
import { infoOutcomeStandard } from "./infoOutcomeStandard";
import { detailOutcomeStandard } from "./detailOutcomeStandard";
import { revisions } from "./revisions";
import { levels } from "./levels";
import { majors } from "./majors";
import { eduPrograms } from "./eduPrograms";
import { infoEduProgram } from "./infoEduProgram";
import { detailEduProgram } from "./detailEduProgram";
import { targetEduProgram } from "./targetEduProgram";

const rootReducer = combineReducers({
  faculties,
  programs,
  subjects,
  usingEduPro,
  outcomeStandards,
  infoOutcomeStandard,
  detailOutcomeStandard,
  revisions,
  levels,
  majors,
  eduPrograms,
  infoEduProgram,
  detailEduProgram,
  targetEduProgram,
  message
});

export default rootReducer;
