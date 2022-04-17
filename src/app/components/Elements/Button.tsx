import React, { useLayoutEffect, useState } from "react";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "./Icon";
import { theme } from "../GlobalStyles";

interface Props {
  onClick?: any;
  outlined?: boolean;
  alignSelf?: string;
  type?: string;
}

export const Button = styled.button<Props>`
  background-color: ${(props) => (props.outlined ? "white" : theme.color.primary)};
  color: ${(props) => (props.outlined ? theme.color.primary : "white")};
  border: ${(props) => (props.outlined ? "4px solid " + theme.color.primary : "none")};
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
;

  :disabled {
    color: ${theme.color.greyLight};
    border: 1px solid ${theme.color.greyLight};
    background-color: white;
  }
`;
export const BackToHistory = () => {
  const history = useHistory();
  return <ButtonSecondary onClick={history.goBack}><Icon src={"back"} />назад</ButtonSecondary>;
};
export const BackToCatalog = () => {
  return <RedirectButton to={"/catalog/1"}><Icon src={"home"} /> в каталог</RedirectButton>;
};
export const CheckBox: React.FC<{ id: number; handler: any; check: boolean }> = ({ id, handler, check = false }) => {
  if (check) return <IoIosCheckmarkCircle size={36} onClick={() => handler(id)} />;
  return <IoIosCloseCircle size={36} className="pointer" onClick={() => handler(id)} />;
};
export const RedirectButton: React.FC<{ to: string, disabled?: boolean }> = ({ to, disabled = false, children }) => {
  const [redirect, setRedirect] = useState(false);
  useLayoutEffect(
    () => {
      if (redirect) setRedirect(false);
    },
    [redirect]
  );
  if (redirect) return <Redirect to={to} />;
  const handle = () => setRedirect(true);
  return <ButtonSecondary disabled={disabled} onClick={handle}>{children}</ButtonSecondary>;
};