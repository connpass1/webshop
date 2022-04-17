import { mapContent } from "../store/helper";
import { actionsContent } from "../store/storeContent";
import React, { FunctionComponent,   useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "../components/Blocks/Logout";
import {   UserModel } from "../models/UserModel";
import { Icon } from "../components/Elements/Icon";
import { Column, FlexBetween, FlexEnd } from "../components/Elements/Styled";
import ProfilePage from "../pages/ProfilePage";
import OrderPage from "../pages/OrderPage";
import { RedirectButton } from "../components/Elements/Button";

type Props = ReturnType<typeof mapContent> & typeof actionsContent & { customer: UserModel }
const RouterComponent: FunctionComponent<Props> = (props) => {
  const location = useLocation();

  useEffect(() => {
    props.contentRequest("/user" + location.pathname)
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const { content, status } = props;
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
        {content?.name && content?.role &&
          <Column>
            <p><em>{content?.name}</em></p>
            <p><em> {content?.role}</em></p>
          </Column>
        }
      </Route>
      <Route path="/profile">
        <h2><Icon src={"profile"} />Контактные данные</h2>
        {props.status === 200 &&
          <ProfilePage data={content} saveHandler={props.saveContentRequest} status={props.status}>
          </ProfilePage>}
      </Route>
      <Route path="/order">
        <h2><Icon src={"order"} />Заказы</h2>
        {status === 200 && <OrderPage data={content} />}
      </Route>
    </Switch>
  </>;
};
const connected1 = connect(mapContent, actionsContent)(RouterComponent);
export default connected1;