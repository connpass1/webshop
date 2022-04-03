import React, { Suspense } from "react";
import { Provider } from "react-redux";
import Wrapper from "./components/Wrapper";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import TestPage from "./pages/TestPage";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { watchUserRequest } from "./store/saga";
import CatalogPage from "./pages/CatalogPage";
import ProfilePage from "./pages/ProfilePage";

import ItemPage from "./pages/ItemPage";
import ErrorPage from "./pages/ErrorPage";
import { reducer } from "./store";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";

export const initialize = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(watchUserRequest);
  return store;
};
const store = initialize();
const P = () => <p>Заготовка статической страницы</p>;

const AdminPage = React.lazy(() => import("./admin/AdminPage"));
const component: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Wrapper>
          <Suspense fallback={<div>Loading...</div>}></Suspense>
          <Route path="/admin">
            <Suspense fallback={<div>Загрузка админки...</div>}>
              <AdminPage />
            </Suspense>
          </Route>
          <Route exact path="/catalog/:id">
            <CatalogPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>

          <Route path="/order">
            <OrderPage />
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
          <Redirect to="/" />
        </Wrapper>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export { component as Router };
//
