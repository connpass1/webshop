import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { actionsUser } from "../../store/storeUser";
import { mapFetchUser } from "../../store/helper";
import styled from "styled-components";
import { Spinner } from "../Elements/SvgSpinner";
import { IoIosLogIn, IoMdCreate } from "react-icons/io";
import { Button } from "../Elements/Button";
import classNames from "classnames";

type Props = ReturnType<typeof mapFetchUser> & typeof actionsUser;
const Input = styled.input`
  padding: 8px 4px;
  max-width: 240px;
  margin-bottom: 12px;
  font-size: 1.1rem;
`;
const Row = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  font-size: 1.2rem;
  label {
    padding: 12px 6px;
  }
  svg {
    padding-left: "2em";
  }
`;
const Fetch = styled.div`
  padding: 12px 0;
  color: var(--secondary-color);
  i {
    color: var(--error-color);
  }
`;
const Reg = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    text-decoration: underline;
    padding: 0 12px;
  }
  .active {
    color: var(--secondary-color);
    font-weight: 900;
  }
  .unActive {
    font-weight: 100;
  }
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
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [registration, setRegistration] = useState(false);

  if (!customer.id)
    return (
      <div className="column">
        <Reg>
          <a onClick={() => setRegistration(false)} className={`${registration ? "unActive" : "active"}`}>
            Авторизация
          </a>
          <a onClick={() => setRegistration(true)} className={`${registration ? "active" : "unActive"}`}>
            Регистрация
          </a>
        </Reg>
        <form className="column">
          <label htmlFor="name">логин</label>
          <Input autoFocus required name="name" value={name} onChange={(v) => setName(v.target.value)} />
          <label htmlFor="password">пароль </label>
          <Input required name="password" type="text" minLength={5} value={password} onChange={(v) => setPassword(v.target.value)} />

          <div>
            {registration ? (
              <Button onClick={() => registrationUserRequest(name, password)}>
                Зарегистрироваться <IoMdCreate />
              </Button>
            ) : (
              <Button onClick={() => loginUserRequest(name, password)}>
                Вход <IoIosLogIn />
              </Button>
            )}
          </div>
          <Fetch>
            {fetching && <Spinner />}

            <ErrorFetch status={errorFetching}></ErrorFetch>
          </Fetch>
        </form>
      </div>
    );
  return (
    <Button onClick={props.logoutUserRequest} style={{ alignSelf: "flex-end" }}>
      Выход <IoIosLogIn />
    </Button>
  );
};

const connectedComponent = connect(mapFetchUser, actionsUser)(Component);
export { connectedComponent as Login };
