import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

type Props = { link: string };
const P = () => <p>Заготовка статической страницы</p>;
const component: React.FC<Props> = (props) => {
  return (
    <Switch>
      <Route exact path="/">
        <h1>главная</h1>
        <P />
      </Route>
      <Route path="/contacts">
        <h1>контакты </h1>
        <P />
      </Route>
      <Route path="/warranty">
        <h1>гарантия</h1>
        <P />
      </Route>
      <Route path="/cargo">
        <h1>доставка </h1>
        <P />
      </Route>
      <Route path="/404">
        <h1>cтраница не найдена </h1>
        <P />
      </Route>
      <Redirect to="/404" />
    </Switch>
  );
};

export default component;
