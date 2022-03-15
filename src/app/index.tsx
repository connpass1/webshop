import React from "react";

import { initialize } from "./saga/create-store";
import { Provider } from "react-redux";
import Wrapper from "./components/Wrapper";
import { BrowserRouter, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";

const store = initialize();

const component: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Wrapper>
        <Route path="/">
          <h1>main</h1>
        </Route>

        <Route path="/test">
          <TestPage />
        </Route>
      </Wrapper>
    </BrowserRouter>
  </Provider>
);

export { component as App };
//
