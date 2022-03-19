import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Router } from "./app/router";
import "./main.css";
ReactDOM.render(<Router />, document.getElementById("root"));
serviceWorker.unregister();
