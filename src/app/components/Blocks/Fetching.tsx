import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { Spinner } from "../Elements/SvgSpinner";

import { theme } from "../GlobalStyles";


export const getMessage = (status: number) => {
  switch (status) {
    case 400:
      return "Контент не найден";
    case 423:
      return "логин занят";
    case 401:
      return "неверные логин и(или) пароль";
    case 404:
      return "контент не найден";
    case 422:
      return "ошибка данных";
    case 500:
      return "сервер недоступен";
    default:
      return "ошибка " + status;
  }
};

const Fetch = styled.div`
  color: ${theme.color.error};
  grid-area: fetch;
display: flex;
`;

export const CheckFetching: FunctionComponent<{ status: number }> = ({ status }) => {
  const [state, setState] = useState(true);

  useEffect(() => {
      if (status > 200) {
        setTimeout(() => {
          setState(false);
        }, 5000);
        if (!state) setState(true);
      }
    }
    , [status]);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Fetch className={"center"}>
      {status < 200 && status !== 0 && <Spinner />}
      {status > 200 && state && <i>{getMessage(status)}</i>}

    </Fetch>
  );
};
