import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { actionsUser } from "../store/storeUser";
import { mapFetchUser } from "../store/helper";
import styled from "styled-components";
import { Button, ButtonSecondary } from "../components/Elements/Button";
import { Column, FlexCenter, FlexEnd } from "../components/Elements/Styled";
import { CheckFetching } from "../components/Fetching";
import LoginRouter from "./LoginRouter";
import { Icon } from "../components/Elements/Icon";
import { theme } from "../components/GlobalStyles";
type Props = ReturnType<typeof mapFetchUser> & typeof actionsUser;
const Styled = styled.div`
  margin: 12px;
  padding: 12px;
  border: 2px solid ${theme.color.primary};
  background-color: ${theme.color.primaryLight};
  color: ${theme.color.primary};
  max-width: 520px;
  align-self: center;
`;
const Component: FunctionComponent<Props> = (props) => {
  const { loginUserRequest, customer, status, registrationUserRequest } = props;
  const [name, setName] = useState("user");
  const [password, setPassword] = useState("password");
  const [registration, setRegistration] = useState(false);
  const loginHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (registration) registrationUserRequest(name, password);
    else loginUserRequest(name, password);
  };
  const changeHandler = (v: { target: { name: string; }; }) => {
    setRegistration(v.target.name === "reg");
    console.log(v);
  };
  if (customer.id && props.children) return <> {props.children}</>;
  if (customer.id) return < LoginRouter customer={customer} />;
  return (
    <Styled>
      <FlexCenter>
        <ButtonSecondary name={"auth"} onClick={changeHandler} outlined={!registration}>
          Авторизация
        </ButtonSecondary>
        <ButtonSecondary name={"reg"} onClick={changeHandler} outlined={registration}>
          Регистрация
        </ButtonSecondary>
      </FlexCenter>
      <hr />
      <form onSubmit={loginHandler}>
        <Column>
          <label htmlFor="name">логин</label>
          <input autoFocus required name="name" value={name} onChange={(v) => setName(v.target.value)} />
          <label htmlFor="password">пароль </label>
          <input required name="password" type="text" minLength={5} value={password}
                 onChange={(v) => setPassword(v.target.value)} />
          <hr />
          <FlexEnd>
            <Column>
              <CheckFetching status={status} />
              <Button type={"submit"} onClick={loginHandler}>
                {registration ? (
                  <>
                    Зарегистрироваться <Icon src="edit" />
                  </>
                ) : (
                  <>
                    Вход <Icon src="enter" />
                  </>
                )}
              </Button></Column>
          </FlexEnd>
        </Column>
      </form>
    </Styled>
  );
};
const connectedComponent = connect(mapFetchUser, actionsUser)(Component);
export default connectedComponent;
