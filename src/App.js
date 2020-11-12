import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, HashRouter, Switch, BrowserRouter, Redirect } from "react-router-dom";
import store from "./store";

import Login from "./screens/Login";
import Verify from "./screens/Verify";
import Survey from "./screens/Survey";
import Disclaimer from "./screens/Survey/disclaimer.js";
import TreatmentED from "./screens/TreatmentED";
import TreatmentHairloss from "./screens/Treatment_Hairloss";
import IDVerification from "./screens/IDVerification";
import Summary from "./screens/Summary";
import Congratulation from "./screens/Congratulation";
import NotFoundPage from "./screens/NotFoundPage";

import PrivateRoute from "./PrivateRoute";

export default class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <BrowserRouter>
          <Provider store={store}>
            <HashRouter>
              <Switch>
                <Route exact path='/' component={Login} />
                <PrivateRoute exact path='/verify/:type' component={Verify} />
                <PrivateRoute exact path='/survey/:type' component={Survey} />
                <PrivateRoute exact path='/disclaimer' component={Disclaimer} />
                <PrivateRoute exact path='/treatment_preference/ed' component={TreatmentED} />
                <PrivateRoute exact path='/treatment_preference/hairloss' component={TreatmentHairloss} />
                <PrivateRoute exact path='/id_verification' component={IDVerification} />
                <PrivateRoute exact path='/summary' component={Summary} />
                <PrivateRoute exact path='/congratulation' component={Congratulation} />
                <Route path='/404' component={NotFoundPage} />
                <Redirect to='/404' />
              </Switch>
            </HashRouter>
          </Provider>
        </BrowserRouter>
      </div>
    );
  }
}
