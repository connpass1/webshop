import { mapContent } from "../store/helper";
import { actionsContent } from "../store/storeContent";
import React, { FunctionComponent, useEffect } from "react";
import { ICustomer } from "../store/Models";
import { Route, Switch, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import OrderPage from "../pages/OrderPage";
import ProfilePage from "../pages/ProfilePage";
import { CheckFetching } from "../components/Fetching";


type Props = ReturnType<typeof mapContent> & typeof actionsContent&{customer:ICustomer}
const RouterComponent: FunctionComponent<   Props > = ( props  ) => {
  const location = useLocation();
  console.log(location.pathname);


  useEffect(() => {

        props.contentRequest(location.pathname+'/'+props.customer.id)}

    , [location]);

  return < >
    <CheckFetching   status={props.status}/>

<Switch>
    <Route path="/order">
      <OrderPage   data={props.content}/>

    </Route>
    <Route path="/user/profile">

      <ProfilePage profile={props.content}></ProfilePage>
    </Route></Switch>

  </>
}

const connected1  = connect(mapContent, actionsContent)(RouterComponent );

export  default  connected1