import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import EducateProgram from "./containers/EducateProgram";
import OutcomeStandard from "./containers/OutcomeStandard";
import TestOutcomeStandard from "./containers/TestOutcomeStandard";
import EditOutcomeStandard from "./containers/EditOutcomeStandard";
import SubjectManage from "./containers/SubjectManage";
import Errors from "./containers/Errors";

export default [{
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
    path: "/outcome-standard/test",
    exact: true,
    layout: DefaultLayout,
    component: TestOutcomeStandard
  },
  {
    path: "/outcome-standard/edit",
    exact: false,
    layout: DefaultLayout,
    component: EditOutcomeStandard
  },
  {
    path: "/subject-manage",
    exact: true,
    layout: DefaultLayout,
    component: SubjectManage
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  }
];
