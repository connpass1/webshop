import React from "react";
import { Route, Switch } from "react-router-dom";
import { H1 } from "../../Elements/Icon";
import { BackButton, MainCenter } from "../../Elements/Styled";
import AdminLinks from "../AdminLinks";

const Basic: React.FC = () => {
  return (
    <>
      <H1 src="error">
        <Switch>
          <Route exact path="/admin/page/**">
            Статья удалена.
          </Route>
          <Route exact path="/admin/catalog/**">
            Группа удалена.
          </Route>

          <Route exact path="/admin/item/**">
            Товар удален.
          </Route>
          <Route exact path="/admin/**">
            Контент удален.
          </Route>
        </Switch>
      </H1>
      <MainCenter>
        <BackButton />
        <hr />
        <AdminLinks />
      </MainCenter>
    </>
  );
};
export default React.memo(Basic);
