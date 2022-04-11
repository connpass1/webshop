import React, {  Suspense } from "react";
import { Provider } from "react-redux";
import Wrapper from "../components/Wrapper";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import TestPage from "../pages/TestPage";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { watchUserRequest } from "../store/saga";
import ErrorPage from "../pages/ErrorPage";
import { reducer } from "../store";
import FetchRouter from "./FetchRouter";
import { Spinner } from "../components/Elements/SvgSpinner";
import HomePage from "../pages/HomePage";
import PageRouter from "./PageRouter";
export const initialize = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(watchUserRequest);
  return store;
};
const store = initialize();
const  LoginPage = React.lazy(() => import("../pages/LoginPage"));
const  CartPage = React.lazy(() => import("../pages/CartPage"));

const Cart=()=> <Suspense fallback={<Spinner/>}> <CartPage  /> </Suspense>
const Login =()=><Suspense fallback={<Spinner/>}><LoginPage  /></Suspense>

const component: React.FC = () => (
 <Provider store={store}>

    <BrowserRouter>
      <Switch>
        <Wrapper>
          <Route  exact  path={[  "/catalog/:id", "/item","/item/:id",  ] } component={FetchRouter}/>

          <Route   exact     path={[  "/user/:id",  "/order" ] } component={ Login}/>


          <Route exact path="/cart" component={ Cart }/>
          <Route exact   path={[  "/",  ""  ] } component={HomePage}/>
          <Route exact   path={    "/page/:id"  } component={PageRouter}/>
          <Route path='/:id' component={ErrorPage}/>
        </Wrapper>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export { component as Router };


