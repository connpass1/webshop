import React, { useLayoutEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../GlobalStyles";
import { Icon } from "./Icon";

interface Props {
  onClick?: any;
  outlined?: boolean;
  alignSelf?: string;
  type?: string;
}

export const Button = styled.button<Props>`
  background-color: ${(props) => (props.outlined ? "white" : theme.color.secondary)};
  color: ${(props) => (props.outlined ? theme.color.secondary : "white")};
  border: ${(props) => (props.outlined ? "4px solid " + theme.color.secondary : "none")};
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : "flex-start")};

  svg {
    padding: 0 0 0 0.5em;
  }
`;
export const ButtonSecondary = styled.button<Props>`
  color: ${theme.color.secondary};
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  text-decoration: ${(props) => (props.outlined ? "underline" : "none")};
  font-weight: ${(props) => (props.outlined ? 800 : 400)};
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : "flex-start")};
  padding: 0;
  margin: 0;

  :disabled {
    background-color: transparent;
    color: ${theme.color.grey};
  }
`;
export const RectButton = styled.button<Props>`
  color: ${theme.color.secondary};
  border: 1px solid ${theme.color.primary};
  background-color: white;
  font-size: 1.2rem;

  :focus {
    outline: none !important;
    box-shadow: 0 0 5px ${theme.color.primary};
  }
  :disabled {
    color: ${theme.color.greyLight};
    border: 1px solid ${theme.color.greyLight};
    background-color: white;
  }
`;

export const BackToCatalog = () => {
  return (
    <RedirectButton to={"/catalog/1"}>
      <Icon src={"menu"} /> в каталог
    </RedirectButton>
  );
};

export const RedirectButton: React.FC<{ to: string; disabled?: boolean }> = ({ to, disabled = false, children }) => {
  const [redirect, setRedirect] = useState(false);
  useLayoutEffect(() => {
    if (redirect) setRedirect(false);
  }, [redirect]);
  if (redirect) return <Redirect to={to} />;
  const handle = () => setRedirect(true);
  return (
    <ButtonSecondary disabled={disabled} onClick={handle}>
      {children}
    </ButtonSecondary>
  );
};
