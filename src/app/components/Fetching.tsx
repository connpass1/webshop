import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Spinner } from "./Elements/SvgSpinner";
import { getMessage } from "../data";
import { theme } from "./GlobalStyles";


const Fetch = styled.div`

  color: ${theme.color.error};;

  margin: auto
`;


export const CheckFetching: FunctionComponent<{ status: number }> = ({ status }) => {
  if (status == 200 || status === 0) return <div />;
  return (
    <Fetch>
      {status < 200 && <Spinner />}
      {status > 200 && <i>{getMessage(status)}</i>}
    </Fetch>
  );
};



