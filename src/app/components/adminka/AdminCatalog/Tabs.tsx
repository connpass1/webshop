import React, { useState } from "react";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { device, theme } from "../../GlobalStyles";
const Tabs = styled.div`
  user-select: none;
  justify-self: flex-start;
  align-self: flex-end;
  display: grid;
  gap: 1px;
  grid-auto-flow: column;
  margin: 4px 12px;
  overflow-x: auto;
  @media ${device.mobile} {
    margin: 4px 0;
  }
`;

const StyledButton = styled.button<{ active: boolean }>`
  border-color: ${(props) => (props.active ? "currentColor" : "white")} !important;

  padding: 4px;
  background-color: white;
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 2px solid white;

  :disabled {
    background-color: white;
    color: ${theme.color.disabled} !important;
  }
`;
const Component: React.FC<any> = (props) => {
  const [state, setState] = useState(0);
  const handle = () => {
    setState(0);
  };
  const handle1 = () => {
    setState(1);
  };
  const handle2 = () => {
    setState(2);
  };
  return (
    <>
      <Tabs>
        <StyledButton active={state === 0} onClick={handle}>
          Просмотреть
        </StyledButton>
        <StyledButton active={state === 1} onClick={handle1}>
          Редактировать
        </StyledButton>
        <StyledButton active={state === 2} onClick={handle2}>
          Удалить
        </StyledButton>
      </Tabs>
      {props.children[state]}
    </>
  );
};
const Basic: React.FC<{ status: number; children: any[] }> = ({ status, children }) => {
  const { id } = useParams() as any;
  const history = useHistory() as any;

  if (status === 201)
    return (
      <>
        <b>
          <Switch>
            <Route exact path="/admin/page/**">
              Статья сохранена.
            </Route>
            <Route exact path={"/admin/catalog/**"}>
              Группа сохранена.
            </Route>

            <Route exact path="/admin/item/**">
              Товар сохранен.
            </Route>
            <Route exact path="/admin/**">
              Контент сохранен.
            </Route>
          </Switch>
        </b>
        <button onClick={() => history.goBack()}>Продолжить... </button>
      </>
    );

  if (!id) return <>{children[0]}</>;

  if (!id || Number(id) === 0) return <>{children}</>;
  return <Component>{children}</Component>;
};
export default React.memo(Basic);
