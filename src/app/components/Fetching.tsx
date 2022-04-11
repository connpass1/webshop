import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Spinner } from "./Elements/SvgSpinner";
import { getMessage } from "../data";
import { theme } from "./GlobalStyles";

const Fetch = styled.div`
  color: ${theme.color.error};
  margin: auto;
  height: 20px;
`;
export const CheckFetching: FunctionComponent<{ status: number }> = ({ status }) => {
  return (
    <Fetch>
      {status < 200 && status !== 0 && <Spinner />}
      {status > 200 && <i>{getMessage(status)}</i>}
    </Fetch>
  );
};
