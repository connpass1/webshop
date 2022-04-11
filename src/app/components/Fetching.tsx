import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Spinner } from "./Elements/SvgSpinner";
import { getMessage } from "../data";


const Fetch = styled.div`

  color: var(--error-color);

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



