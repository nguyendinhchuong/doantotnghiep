import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Login from "./containers/Login";

import routes from "./routes";
import withTracker from "./withTracker";

import ScrollToTop from "./ScrollToTop";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/shards-dashboards.1.1.0.min.css";

export default () => (
  <Router basename={process.env.REACT_APP_BASENAME}>
    <div>
      <ScrollToTop>
        {routes.map((route, index) => {
          return (
            <PrivateRoute
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                );
              })}
            />
          );
        })}
      </ScrollToTop>
      <Route path="/login" component={Login} />
    </div>
  </Router>
);
