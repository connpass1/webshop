import React, { Children } from "react";
import { IoIosLogOut } from "react-icons/io";
import styled from "styled-components";
interface Props {
  onClick: any;
  outlined?: boolean;
}

export const Button = styled.button<Props>`
  background-color: ${(props) => (props.outlined ? "white" : "var(--primary-color)")};
  color: ${(props) => (props.outlined ? "var(--primary-color)" : "white")};
  border: ${(props) => (props.outlined ? "4px solid var(--primary-color)" : "none")};
 
  svg {
    padding: 0 0 0 0.5em;
  }
`;
