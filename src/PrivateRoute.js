import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => <Route {...rest} render={props => (sessionStorage.getItem("loggedIn") ? <Component {...props} /> : <Redirect to={{ path: "/login", state: { from: props.location } }} />)} />;

export default PrivateRoute;
