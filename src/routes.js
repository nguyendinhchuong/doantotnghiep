import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import EducateProgram from "./containers/EducateProgram";
import OutcomeStandard from "./containers/OutcomeStandard";
import AddOutcomeStandard from "./containers/AddOutcomeStandard";
import CourseRegister from "./containers/CourseRegister";
import Errors from "./containers/Errors";
import CourseMaps from "./containers/CourseMaps";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/educate-program" />
  },
  {
    path: "/educate-program",
    exact: true,
    layout: DefaultLayout,
    component: EducateProgram
  },
  {
    path: "/outcome-standard",
    exact: true,
    layout: DefaultLayout,
    component: OutcomeStandard
  },
  {
    path: "/outcome-standard/add",
    exact: true,
    layout: DefaultLayout,
    component: AddOutcomeStandard
  },
  {
    path: "/course-register",
    exact: true,
    layout: DefaultLayout,
    component: CourseRegister
  },
  {
    path: "/course-maps",
    exact: true,
    layout: DefaultLayout,
    component: CourseMaps
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
];
