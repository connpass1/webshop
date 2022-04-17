import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapContent, mapFetchUser, PropsContent } from "../store/helper";
import { actionsContent } from "../store/storeContent";
import { Link, Redirect, Route, Switch, useLocation } from "react-router-dom";

import AdminArticle from "../components/adminka/AdminArticle";
import AdminItem from "../components/adminka/AdminItem";
import AdminArticleList from "../components/adminka/AdminArticleList";
import AdminProfileList from "../components/adminka/AdminProfileList";
import AdminProfile from "../components/adminka/AdminProfile";
import { Column } from "../components/Elements/Styled";
import { Icon } from "../components/Elements/Icon";
import AdminItemList from "../components/adminka/AdminItemList";

const Router: React.FC<PropsContent> = (props) => {
  const location = useLocation();
  useEffect(() => {
    props.contentRequest(location.pathname);
  }, [location.pathname]);// eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setContent(props.content);
  }, [props.content]);
  const [content, setContent] = useState();
  const handler = () => {
    setContent(undefined);
  };

  if (props.status > 200) return <> {props.status} </>;

  return <>
    <Column>
      <Link to={"/admin/page/0"} onClick={handler}> создать статью</Link>
      <Link to={"/admin/user/1"} onClick={handler}> user/1</Link>
      <Link to={"/admin/profile/1"} onClick={handler}> profile/1</Link>
      <Link to={"/admin/item/0"} onClick={handler}> создать товар</Link>
      <hr />
      <Link to={"/admin/profiles/1"} onClick={handler}> список пользователей</Link>
      <Link to={"/admin/items/1"} onClick={handler}> список товаров</Link>
      <Link to={"/admin/pages"} onClick={handler}> список статей</Link>

    </Column>
    <Switch>
      {props.content && <>
        <Route exact path="/admin/*/page/:id">
          {props.status === 200 && <h1><Icon src={"delete"} /> Контент удален </h1>}
        </Route>

        <Route exact path="/admin/page/:id">
          <AdminArticle {...props} />
        </Route>
        <Route exact path="/admin/item/:id">
          <AdminItem />
        </Route>
        <Route exact path="/admin/items/:id">
          <AdminItemList {...props} />
        </Route>
        <Route exact path="/admin/pages">
          <AdminArticleList {...content} />
        </Route>
        <Route exact path="/admin/profiles/1">
          <AdminProfileList {...content} />
        </Route>
        <Route exact path="/admin/profile/1">
          <AdminProfile  {...content} />
        </Route>
      </>
      }</Switch>
    {JSON.stringify(content)}
  </>;
};
const RouterConnected = connect(mapContent, actionsContent)(Router);


type Props = ReturnType<typeof mapFetchUser>;
const Filter: React.FC<Props> = (props) => {
  if (props.customer?.role !== "ADMIN")
    return <Redirect to="/profile" />;
  return <RouterConnected />;

};
const connectedComponent = connect(mapFetchUser)(Filter);
export default connectedComponent;