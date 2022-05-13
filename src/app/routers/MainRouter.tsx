import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { Spinner } from "../components/Elements/SvgSpinner";
import GlobalStyles from "../components/GlobalStyles";
import Wrapper from "../components/Wrapper";
import Article from "../pages/Article";
import Catalog from "../pages/CatalogPage";
import ErrorPage, { ErrorPath } from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import ItemDetailPage from "../pages/ItemPage";
import { reducer } from "../store";
import { watchUserRequest } from "../store/saga";
import AdminRouter from "./AdminRouter";

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
const Cart = () => (
  <Suspense fallback={<Spinner />}>
    <CartPage />
  </Suspense>
);
const LoginFilter = () => (
  <Suspense fallback={<Spinner />}>
    <Login />
  </Suspense>
);
const AdminFilter = () => (
  <Suspense fallback={<Spinner />}>
    <AdminRouter />
  </Suspense>
);
const component: React.FC = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Router>
      <Wrapper>
        <Switch>
          <Route path="/catalog/:id" component={Catalog} />
          <Route path="/item/:id" component={ItemDetailPage} />
          <Route path={["/profile", "/order"]} component={LoginFilter} />
          <Route path="/cart" component={Cart} />
          <Route exact="true" path="/" component={HomePage} />
          <Route path="/page/:id" component={Article} />
          <Route path="/admin/**" component={AdminFilter} />
          <Route path="/error/:id" component={ErrorPage} />
          <Route path="/**" component={ErrorPath} />
        </Switch>
      </Wrapper>
    </Router>
  </Provider>
);
export { component as Router };
