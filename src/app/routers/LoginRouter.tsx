import { mapContent } from "../store/helper";
import { actionsContent } from "../store/storeContent";
import React, { FunctionComponent, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "../components/Blocks/Logout";
import { UserModel } from "../models/UserModel";
import { Icon } from "../components/Elements/Icon";
import { Column, FlexBetween, FlexEnd } from "../components/Elements/Styled";
import ProfilePage from "../pages/ProfilePage";
import OrderPage from "../pages/OrderPage";
import { RedirectButton } from "../components/Elements/Button";
import { CUSTOMER } from "../data";
type Props = ReturnType<typeof mapContent> & typeof actionsContent & { customer: UserModel }
const RouterComponent: FunctionComponent<Props> = (props) => {
  const location = useLocation();
  useEffect(() => {
    function f() {
      props.contentRequest("/user" + location.pathname);
      console.log("/user" + location.pathname);
    }
    return f();
  }, [location.pathname, props.contentRequest]);
  let ret = localStorage.getItem(CUSTOMER);
  return < >
    <h1><Icon src={"person"} />Личный кабинет</h1>
    <FlexBetween>
      <Column>
        <RedirectButton to={"/profile"} disabled={location.pathname === "/profile"}>Контактные данные</RedirectButton>
        <RedirectButton to={"/order"} disabled={location.pathname === "/order"}>Заказы</RedirectButton>
      </Column>
      <FlexEnd> <Logout /></FlexEnd>
    </FlexBetween>
    <Switch>
      <Route path="/enter">
        {props.content?.name && props.content?.role &&
          <Column>
            <p><em>{props.content?.name}</em></p>
            <p><em> {props.content?.role}</em></p>
          </Column>
        }
      </Route>
      <Route path="/profile">
        <h2><Icon src={"profile"} />Контактные данные</h2>
        {props.status == 200 && <ProfilePage data={props.content} saveHandler={props.saveContentRequest} />}
      </Route>
      <Route path="/order">
        <h2><Icon src={"order"} />Заказы</h2>
        {props.status == 200 && <OrderPage data={props.content} />}
      </Route>
    </Switch>
  </>;
};
const connected1 = connect(mapContent, actionsContent)(RouterComponent);
export default connected1;