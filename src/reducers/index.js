import { combineReducers } from "redux";
import { faculties } from "./faculties";
import { programs } from "./programs";

const rootReducer = combineReducers({
  faculties,
  programs
});
export default rootReducer;
