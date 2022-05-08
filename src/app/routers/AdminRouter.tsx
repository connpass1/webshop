import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminArticle from "../components/adminka/AdminArtice/AdminArticle";
import AdminArticleList from "../components/adminka/AdminArticleList";
import AdminCatalog from "../components/adminka/AdminCatalog/AdminCatalog";
import AdminGroup from "../components/adminka/AdminGroup";
import AdminItem from "../components/adminka/AdminItem";
import AdminItemList from "../components/adminka/AdminItemList";
import AdminOder from "../components/adminka/AdminOrder";
import AdminOderList from "../components/adminka/AdminOrderList";
import AdminProfile from "../components/adminka/AdminProfile";
import AdminProfileList from "../components/adminka/AdminProfileList";
import { mapContent, mapFetchUser, PropsContent } from "../store/helper";
import { actionsContent } from "../store/storeContent";

const Router: React.FC<PropsContent> = (props) => {
  return (
    <Switch>
      <Route exact path="/admin/page/:id">
        <AdminArticle />
      </Route>
      <Route exact path="/admin/item/:id/:cat">
        <AdminItem {...props} />
      </Route>
      <Route exact path="/admin/items/:id">
        <AdminItemList />
      </Route>
      <Route exact path="/admin/pages/:id">
        <AdminArticleList />
      </Route>
      <Route exact path="/admin/group/:id">
        <AdminGroup />
      </Route>
      <Route exact path="/admin/profile/:id">
        <AdminProfile />
      </Route>
      <Route exact path="/admin/profiles/:id">
        <AdminProfileList />
      </Route>
      <Route exact path="/admin/catalog/:id">
        <AdminCatalog />
      </Route>
      <Route exact path="/admin/order/:id">
        <AdminOder />
      </Route>
      <Route exact path="/admin/orders/**">
        <AdminOderList />
      </Route>
    </Switch>
  );
};
const RouterConnected = connect(mapContent, actionsContent)(Router);
type Props = ReturnType<typeof mapFetchUser>;
const Filter: React.FC<Props> = (props) => {
  if (props.customer?.role !== "ADMIN") return <Redirect to="/profile" />;
  return <RouterConnected />;
};
const connectedComponent = connect(mapFetchUser)(Filter);
export default connectedComponent;
