import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import EducationProgram from "./containers/EducationProgram";
import EditEducationProgram from "./containers/EditEducationProgram";
import OutcomeStandard from "./containers/OutcomeStandard";
import EditOutcomeStandard from "./containers/EditOutcomeStandard";
import SubjectManage from "./containers/SubjectManage";

import ContentProgramCom from "./components/detailEducationProgram/ContentProgramCom";
import DetailOutcomeStandardCom from "./components/detailOutcomeStandard/DetailOutcomeStandardCom";

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
    path: "/cp/test",
    exact: true,
    layout: DefaultLayout,
    component: ContentProgramCom
  },
  {
    path: "/dos/test",
    exact: true,
    layout: DefaultLayout,
    component: DetailOutcomeStandardCom
  }
];
