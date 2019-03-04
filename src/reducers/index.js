import { combineReducers } from "redux";
import { faculties } from "./faculties";
import { programs } from "./programs";
import { outcomeStandards } from "./outcomeStandards";
import { infoOutcomeStandard } from "./infoOutcomeStandard";
import { detailOutcomeStandard } from "./detailOutcomeStandard";
import { message } from "./message";

const rootReducer = combineReducers({
  faculties,
  programs,
  outcomeStandards,
  infoOutcomeStandard,
  detailOutcomeStandard,
  message
});
export default rootReducer;
