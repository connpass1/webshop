import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Spinner } from "./Elements/SvgSpinner";
import { Column } from "./Elements/Styled";


const Fetch = styled.div`
  min-width: 300px;
  min-height: 100px; 
  color: var(--error-color);
  
  position: absolute;
  margin:auto
`;
const getMessage = (status: number) => {
  switch (status) {
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

export const CheckFetching: FunctionComponent<{ status: number }> = ({ status }) => {

   if(status==200  || status === 0) return null
  return (

      <Fetch>
        {status< 200 &&   <Spinner />}
       {status > 200 && <i>{getMessage(status)}</i>}
      </Fetch>

  );
};
