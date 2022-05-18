import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminArticle from "../components/adminka/AdminArtice/AdminArticle";
import AdminArticleList from "../components/adminka/AdminArtice/AdminArticleList";
import AdminCatalog from "../components/adminka/AdminCatalog/AdminCatalog";
import ContentUpdated from "../components/adminka/AdminCatalog/ContentUpdated";
import AdminItem from "../components/adminka/AdminItem/AdminItem";
import AdminItemList from "../components/adminka/AdminItem/AdminItemList";
import AdminOder from "../components/adminka/AdminOrder";
import AdminOderList from "../components/adminka/AdminOrderList";
import AdminProfile from "../components/adminka/AdminProfile";
import AdminProfileList from "../components/adminka/AdminProfileList";
import { ErrorPath } from "../pages/ErrorPage";
import { mapContent, mapFetchUser, PropsContent } from "../store/helper";
import { actionsContent } from "../store/storeContent";
import { Fetch } from "./MainRouter";

const CheckStatus: React.FC<any> = (props) => {
  return (
    <>
      {props.children}
      {props.status !== 200 && <ContentUpdated />}
    </>
  );
};

const Router: React.FC<PropsContent> = (props) => {
  return (
    <Switch>
      <Fetch contentRequest={props.contentRequest} url={props.url} status={props.status} content={props.content}>
        <CheckStatus status={props.status}>
          <Route exact path="/admin/page/:id">
            <AdminArticle {...props} />
          </Route>
          <Route exact path={["/admin/catalog", "/admin/catalog/:id", "/admin/catalog/:cat/:id"]}>
            <AdminCatalog {...props} />
          </Route>
        </CheckStatus>
        <Route exact path="/admin/item/:id/:cat">
          <AdminItem {...props} />
        </Route>
        <Route exact path="/admin/item/:id">
          <AdminItem {...props} />
        </Route>
        <Route exact path="/admin/items/:id">
          <AdminItemList content={props.content} />
        </Route>
        <Route exact path="/admin/pages">
          <AdminArticleList content={props.content} />
        </Route>

        <Route exact path="/admin/profile/:id">
          <AdminProfile content={props.content} />
        </Route>
        <Route exact path="/admin/profiles/:id">
          <AdminProfileList content={props.content} />
        </Route>

        <Route exact path="/admin/order/:id">
          <AdminOder {...props} />
        </Route>
        <Route exact path="/admin/orders/**">
          <AdminOderList content={props.content} />
        </Route>
      </Fetch>

      <Route path="/admin/**">
        <ErrorPath />
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
