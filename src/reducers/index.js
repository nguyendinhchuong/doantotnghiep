import { combineReducers } from "redux";
import { faculties } from "./faculties";
import { programs } from "./programs";
import { subjects } from "./subjects";
import { outcomeStandards } from "./outcomeStandards";
import { infoOutcomeStandard } from "./infoOutcomeStandard";
import { detailOutcomeStandard } from "./detailOutcomeStandard";
import { revisions } from "./revisions";
import { message } from "./message";
import { visible } from "./visible";

const rootReducer = combineReducers({
  faculties,
  programs,
  subjects,
  outcomeStandards,
  infoOutcomeStandard,
  detailOutcomeStandard,
  revisions,
  message,
  visible
});

export default rootReducer;
