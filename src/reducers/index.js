import { combineReducers } from "redux";
import { message } from "./message";
import { faculties } from "./faculties";
import { programs } from "./programs";
import { subjects } from "./subjects";
import { outcomeStandards } from "./outcomeStandards";
import { infoOutcomeStandard } from "./infoOutcomeStandard";
import { detailOutcomeStandard } from "./detailOutcomeStandard";
import { revisions } from "./revisions";
import { levels } from "./levels";
import { majors } from "./majors";
import { eduPrograms } from "./eduPrograms";
import { infoEduProgram } from "./infoEduProgram";

const rootReducer = combineReducers({
  faculties,
  programs,
  subjects,
  outcomeStandards,
  infoOutcomeStandard,
  detailOutcomeStandard,
  revisions,
  levels,
  majors,
  eduPrograms,
  infoEduProgram,
  message
});

export default rootReducer;
