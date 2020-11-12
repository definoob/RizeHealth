import React from "react";
import { render } from "react-dom";
// import registerServiceWorker from "./registerServiceWorker";
import { unregister } from "./registerServiceWorker";

import "./assets/css/bootstrap.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/green.css";
import "./assets/css/chosen.min.css";
import "./assets/css/style.css";

import App from "./App";

const rootElement = document.getElementById("root");

unregister();

render(<App />, rootElement);

// registerServiceWorker();
