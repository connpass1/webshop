import React, { useState } from "react";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
interface Props {
  onClick: any;
  outlined?: boolean;
  alignSelf?: string;
}

export const Button = styled.button<Props>`
  background-color: ${(props) => (props.outlined ? "white" : "var(--primary-color)")};
  color: ${(props) => (props.outlined ? "var(--primary-color)" : "white")};
  border: ${(props) => (props.outlined ? "4px solid var(--primary-color)" : "none")};
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : "flex-start")};
  svg {
    padding: 0 0 0 0.5em;
  }
`;
export const ButtonSecondary = styled.button<Props>`
  color: var(--secondary-color);
  border: none;
  font-size: 1.4rem;
  font-family: "cursive";
  text-decoration: ${(props) => (props.outlined ? "underline" : "none")};
  font-weight: ${(props) => (props.outlined ? 800 : 400)};
  color: var(--secondary-color);
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : "flex-start")};
  :disabled {
    background-color: white;
    color: var(--grey-color);
  }
`;

export const RedirectButton: React.FC<{ to: string }> = ({ to, children }) => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Redirect to={to} />;
  return <ButtonSecondary onClick={() => setRedirect(true)}>{children}</ButtonSecondary>;
};

export const BackToCatalog = () => {
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Redirect to="/catalog/1" />;
  return <ButtonSecondary onClick={() => setRedirect(true)}>вернуться к покупкам</ButtonSecondary>;
};
export const CheckBox: React.FC<{ id: number; handler: any; check: boolean }> = ({ id, handler, check = false }) => {
  if (check) return <IoIosCheckmarkCircle size={36} onClick={() => handler(id)} />;
  return <IoIosCloseCircle size={36} className="pointer" onClick={() => handler(id)} />;
};
