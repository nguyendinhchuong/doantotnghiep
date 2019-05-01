import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

import EducationProgram from "./containers/EducationProgram";
import EditEducationProgram from "./containers/EditEducationProgram";
import OutcomeStandard from "./containers/OutcomeStandard";
import EditOutcomeStandard from "./containers/EditOutcomeStandard";
import SubjectManage from "./containers/SubjectManage";
import FaProManage from "./containers/FaProManage";
import UserManage from "./containers/UserManage";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/education-program" />
  },
  {
    path: "/education-program",
    exact: true,
    layout: DefaultLayout,
    component: EducationProgram
  },
  {
    path: "/education-program/edit",
    exact: true,
    layout: DefaultLayout,
    component: EditEducationProgram
  },
  {
    path: "/outcome-standard",
    exact: true,
    layout: DefaultLayout,
    component: OutcomeStandard
  },
  {
    path: "/outcome-standard/edit",
    exact: true,
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
    path: "/fapro-manage",
    exact: true,
    layout: DefaultLayout,
    component: FaProManage
  },
  {
    path: "/user-manage",
    exact: true,
    layout: DefaultLayout,
    component: UserManage
  }
];
