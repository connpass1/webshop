import React from "react";

import { initialize } from "./store/create-store";
import { Provider } from "react-redux";
import Wrapper from "./components/Wrapper";
import { BrowserRouter, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";

import Catalog from "./components/Catalog";
import StaticPages from "./pages/StaticPages";

const store = initialize();

const component: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Wrapper>
        <Route path="/">
          <StaticPages link=" " />
        </Route>
        <Route path="/test">
          <TestPage />
        </Route>
        <Route path="/catalog">
          <Catalog />
        </Route>
      </Wrapper>
    </BrowserRouter>
  </Provider>
);

export { component as App };
//
