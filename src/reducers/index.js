import { combineReducers } from "redux";
import { faculties } from "./faculties";
import { programs } from "./programs";
import { outcomeStandards } from "./outcomeStandards";
import { infoOutcomeStandard } from "./infoOutcomeStandard";
import { detailOutcomeStandard } from "./detailOutcomeStandard";
import { revisions } from "./revisions";
import { detailRevision } from "./detailRevision";
import { message } from "./message";
import { isRight } from "./isRight";

const rootReducer = combineReducers({
  faculties,
  programs,
  outcomeStandards,
  infoOutcomeStandard,
  detailOutcomeStandard,
  revisions,
  detailRevision,
  message,
  isRight
});

export default rootReducer;
