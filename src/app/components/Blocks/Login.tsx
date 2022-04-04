import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { actionsUser } from "../../store/storeUser";
import { mapFetchUser } from "../../store/helper";
import styled from "styled-components";
import { Spinner } from "../Elements/SvgSpinner";
import { IoIosLogIn, IoMdCreate } from "react-icons/io";
import { Button, ButtonSecondary } from "../Elements/Button";
import { Column, FlexEnd, Input } from "../Elements/Styled";

type Props = ReturnType<typeof mapFetchUser> & typeof actionsUser;

const Fetch = styled.div`
  padding: 12px 0;
  color: var(--error-color);
`;

const getMessage = (status: number) => {
  switch (status) {
    case 404:
      return "неправильное имя или пароль";
    case 423:
      return "логин занят";
    case 500:
      return "сервер недоступен";
    default:
      return "ошибка" + status;
  }
};
const ErrorFetch: FunctionComponent<{ status: number }> = ({ status }) => {
  if (status === 0) return null;
  if (status === 400) return null;
  return <i>{getMessage(status)}</i>;
};

const Component: FunctionComponent<Props> = (props) => {
  const { loginUserRequest, customer, fetching, errorFetching, registrationUserRequest } = props;
  const [name, setName] = useState("user");
  const [password, setPassword] = useState("password");

  const [registration, setRegistration] = useState(false);
  const loginHandler = () => {
    if (registration) registrationUserRequest(name, password);
    else loginUserRequest(name, password);
  };
  if (customer.id) return <>{props.children}</>;

  return (
    <Column>
      <FlexEnd>
        <ButtonSecondary onClick={() => setRegistration(false)} outlined={!registration}>
          Авторизация
        </ButtonSecondary>
        <ButtonSecondary onClick={() => setRegistration(true)} outlined={registration}>
          Регистрация
        </ButtonSecondary>
      </FlexEnd>
      <Column>
        <label htmlFor="name">логин</label>
        <Input autoFocus required name="name" value={name} onChange={(v) => setName(v.target.value)} />
        <label htmlFor="password">пароль </label>
        <Input required name="password" type="text" minLength={5} value={password} onChange={(v) => setPassword(v.target.value)} />
        <Button onClick={loginHandler}>
          {registration ? (
            <>
              Зарегистрироваться <IoMdCreate />
            </>
          ) : (
            <>
              Вход <IoIosLogIn />
            </>
          )}
        </Button>

        <Fetch>
          {fetching && <Spinner />}
          <ErrorFetch status={errorFetching}></ErrorFetch>
        </Fetch>
      </Column>
    </Column>
  );
};

const connectedComponent = connect(mapFetchUser, actionsUser)(Component);
export { connectedComponent as Login };
