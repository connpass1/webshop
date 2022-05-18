import React, { Suspense, useEffect } from "react";
import { connect, Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { H1 } from "../components/Elements/Icon";
import { Spinner } from "../components/Elements/SvgSpinner";
import GlobalStyles from "../components/GlobalStyles";
import Wrapper from "../components/Wrapper";
import Article from "../pages/Article";
import Catalog from "../pages/CatalogPage";
import ErrorPage, { ErrorPath } from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import ItemDetailPage from "../pages/ItemPage";
import { reducer } from "../store";
import { mapContent, PropsContent } from "../store/helper";
import { watchUserRequest } from "../store/saga";
import { actionsContent } from "../store/storeContent";
import AdminRouter from "./AdminRouter";

export const initialize = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(watchUserRequest);
  // initMessageListener(store);
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

export const Fetch: React.FC<{ contentRequest: any; status: number; url: string; content?: any }> = ({
  contentRequest,
  status,
  url,
  children,
  content,
}) => {
  const location = useLocation();
  function f(str: string) {
    contentRequest(location.pathname);
  }

  useEffect(() => {
    return f(location.pathname);
  }, [location.pathname]);

  const show = (location.pathname.includes(url) || status > 200) && status > 199 && status < 400;

  if (show) return <>{children}</>;
  return (
    <>
      <H1 src={"rect"}>....</H1>
      <main>{JSON.stringify(content)}</main>ь
    </>
  );
};

const FetchRouter: React.FC<PropsContent> = (props) => {
  return (
    <Fetch contentRequest={props.contentRequest} url={props.url} status={props.status} content={props.content}>
      <Route path={["/catalog/:id", "/catalog/"]}>
        <Catalog content={props.content} />
      </Route>
      <Route path="/item/:id">
        <ItemDetailPage content={props.content} />
      </Route>
      <Route path={["/profile", "/order"]} component={LoginFilter} />
      <Route path="/page/:id">
        <Article content={props.content} />
      </Route>
    </Fetch>
  );
};
const RouterConnected = connect(mapContent, actionsContent)(FetchRouter);

const component: React.FC = () => (
  <Provider store={store}>
    <GlobalStyles />
    <Router>
      <Wrapper>
        <Switch>
          <Route path={["/catalog/:id", "/catalog/", "/item/:id", "/profile", "/order", "/page/:id"]} component={RouterConnected} />
          <Route path="/cart" component={Cart} />
          <Route exact path="/" component={HomePage} />
          <Route path="/admin/**" component={AdminFilter} />
          <Route path="/error/:id" component={ErrorPage} />
          <Route path="/**" component={ErrorPath} />
        </Switch>
      </Wrapper>
    </Router>
  </Provider>
);
export { component as Router };
