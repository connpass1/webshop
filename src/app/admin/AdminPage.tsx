import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import AdminCatalog from "./pages/AdminCatalog";

const Component: FunctionComponent = () => {
  return (
    <main>
      <h1>AdminPage </h1>
      <Switch>
        <Route path="/admin/catalog">
          <AdminCatalog />
        </Route>
        <Route path="/admin/pages"> pages</Route>
        <Route path="/admin/items">items </Route>
        <Route>остальное</Route>
      </Switch>
    </main>
  );
};
export default Component;
