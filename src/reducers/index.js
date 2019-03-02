import { combineReducers } from "redux";
import { faculties } from "./faculties";
import { programs } from "./programs";
import { outcomeStandards } from "./outcomeStandards";

const rootReducer = combineReducers({
  faculties,
  programs,
  outcomeStandards
});
export default rootReducer;
