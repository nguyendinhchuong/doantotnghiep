import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import OutcomeStandard from "./views/OutcomeStandard";
import AddOutcomeStandard from "./views/AddOutcomeStandard";
import BlogPosts from "./views/BlogPosts";
import AddOS from './components/AddOS'

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
    component: BlogOverview
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
    component: AddNewPost
  },
  {
    path: "/course-maps",
    exact: true,
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/addOs",
    layout: DefaultLayout,
    component: AddOS
  },
];
