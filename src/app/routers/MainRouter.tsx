import React, { Suspense } from "react";
import { Provider } from "react-redux";
import Wrapper from "../components/Wrapper";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { watchUserRequest } from "../store/saga";
import ErrorPage from "../pages/ErrorPage";
import { reducer } from "../store";
import { Spinner } from "../components/Elements/SvgSpinner";
import HomePage from "../pages/HomePage";
import GlobalStyles from "../components/GlobalStyles";
import Article from "../pages/Article";
import AdminRouter from "./AdminRouter";
import Catalog from "../pages/CatalogPage";
import ItemDetailPage from "../pages/ItemPage";

export const initialize = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(watchUserRequest);
  return store;
};
const store = initialize();
const Login = React.lazy(() => import("./LoginFilter"));
const CartPage = React.lazy(() => import("../pages/CartPage"));
const Cart = () => <Suspense fallback={<Spinner />}> <CartPage /> </Suspense>;
const LoginFilter = () => <Suspense fallback={<Spinner />}><Login /></Suspense>;
const AdminFilter = () => <Suspense fallback={<Spinner />}><AdminRouter /></Suspense>;
const component: React.FC = () => (
  <Provider store={store}>
    <GlobalStyles />
    <BrowserRouter>
      <Switch>
        <Wrapper>
          <Route exact path="/catalog/:id">
            <Catalog />
          </Route>
          <Route exact path="/item/:id">
            <ItemDetailPage />
          </Route>
          <Route exact path={[  "/profile",  "/order"]} component={LoginFilter} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path={["/", ""]} component={HomePage} />
          <Route exact path={"/page/:id"} component={Article} />
          <Route exact path={"/admin/**"} component={AdminFilter} />
          <Route path="/error/:id" component={ErrorPage} />
        </Wrapper>
      </Switch>
    </BrowserRouter>
  </Provider>
);
export { component as Router };
