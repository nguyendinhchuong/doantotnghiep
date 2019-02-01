import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import App from "./App";

const Root = ({ store }) => (
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/" component={App} />
			</Switch>
		</BrowserRouter>
	</Provider>
);

export default Root;
