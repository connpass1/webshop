import React, {  Suspense } from "react";
import { Provider } from "react-redux";
import Wrapper from "../components/Wrapper";
import { BrowserRouter, Redirect, Route, Switch  } from "react-router-dom";
import TestPage from "../pages/TestPage";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { watchUserRequest } from "../store/saga";
import ErrorPage from "../pages/ErrorPage";
import { reducer } from "../store";
import FetchRouter from "./FetchRouter";

export const initialize = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(watchUserRequest);
  return store;
};
const store = initialize();
const P = () => <p>Заготовка статической страницы</p>;

const  LoginPage = React.lazy(() => import("../pages/LoginPage"));
const  CartPage = React.lazy(() => import("../pages/CartPage"));
const component: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Wrapper>
          <Suspense fallback={<div>Loading...</div>}/>



          <Route path={[  "/catalog/:id", "/item","/item/:id",  ] }>
              <FetchRouter/>
          </Route>

          <Route path={[  "/user/profile",  "/order", "/login"  ] }>
            <Suspense fallback={<div>Загрузка админки...</div>}>
              <LoginPage  />
            </Suspense>
          </Route>

          <Route exact path="/cart">
            <Suspense fallback={<div>Загрузка админки...</div>}>
              <CartPage  />
            </Suspense>
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
            <TestPage/>
          </Route>
          <Route exact path="/error/:id">
            <ErrorPage />
          </Route>
          <Redirect to="/error/404" />
        </Wrapper>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export { component as Router };


