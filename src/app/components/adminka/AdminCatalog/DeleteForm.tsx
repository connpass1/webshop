import { Formik } from "formik";
import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { FORM } from "../../Elements/StyledForms";
import { theme } from "../../GlobalStyles";
const DeleteForm = styled(FORM)`
  color: ${theme.color.primary};
`;
const Header = styled.div`
  border-bottom: 2px solid currentColor;
  ${theme.font.Pattaya}
  font-size:1.5em;
  padding: 12px;
`;
const Caption = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  text-align: center;
  ${theme.font.Bold}
  font-size:1.8rem;
`;

const Component: React.FC<{ req: () => void; caption: string }> = ({ req, caption, children }) => {
  return (
    <Formik onSubmit={req} initialValues={{}}>
      <DeleteForm>
        <Header>
          Удалить&nbsp;
          <Switch>
            <Route exact path="/admin/page/**">
              статью
            </Route>
            <Route exact path="/admin/catalog/**">
              группу
            </Route>
            <Route exact path="/admin/item/**">
              товар
            </Route>
            <Route exact path="/admin/**">
              контент
            </Route>
          </Switch>
        </Header>
        <Caption>{caption}</Caption>
        {children}
        <input type={"submit"} value={"удалить"} />
      </DeleteForm>
    </Formik>
  );
};
export default Component;
