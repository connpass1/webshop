import React from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";
const Styled = styled.i`
  margin-right: 0.4em;
`;

const Component: FunctionComponent = ({ children }) => {
  return (
    <Styled>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        {children}
      </svg>
    </Styled>
  );
};
export default Component;
