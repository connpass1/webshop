import React from "react";
import { Provider } from "react-redux";
import Wrapper from "./components/Wrapper";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import TestPage from "./pages/TestPage";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { watchGetCustomerRequest } from "./store/saga";

import CatalogPage from "./pages/CatalogPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ItemPage from "./pages/ItemPage";
import ErrorPage from "./pages/ErrorPage";
import { reducer } from "./store";
export const initialize = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(watchGetCustomerRequest);
  return store;
};
const store = initialize();
const P = () => <p>Заготовка статической страницы</p>;
const component: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Wrapper>
        <Switch>
          <Route exact path="/catalog/:id">
            <CatalogPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/item/:id">
            <ItemPage />
          </Route>
          <Route exact path="/">
            <h1>главная</h1>
            <P />
          </Route>
          <Route path="/contacts">
            <h1>контакты </h1>
            <P />
          </Route>
          <Route path="/warranty">
            <h1>гарантия</h1>
            <P />.
          </Route>
          <Route path="/cargo">
            <h1>доставка </h1>
            <P />
          </Route>

          <Route path="/test">
            <TestPage></TestPage>
          </Route>
          <Route exact path="/error/:id">
            <ErrorPage />
          </Route>

          <Redirect to="/error/404" />
        </Switch>
      </Wrapper>
    </BrowserRouter>
  </Provider>
);

export { component as Router };
//
