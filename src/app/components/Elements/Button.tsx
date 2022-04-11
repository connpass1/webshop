import React, { useState } from "react";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "./Icon";
import { theme } from "../GlobalStyles";

interface Props {
  onClick: any;
  outlined?: boolean;
  alignSelf?: string;
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
    color: var(--grey-color);
  }
`;

export const BackToHistory = () => {
  const history = useHistory();

  return <ButtonSecondary onClick={history.goBack}><Icon src={"back"} />назад на предъидущую страницу</ButtonSecondary>;
};
export const BackToCatalog = () => {
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Redirect to="/catalog/1" />;
  return <ButtonSecondary onClick={() => setRedirect(true)}><Icon src={"home"} /> вернуться в каталог</ButtonSecondary>;
};
export const CheckBox: React.FC<{ id: number; handler: any; check: boolean }> = ({ id, handler, check = false }) => {
  if (check) return <IoIosCheckmarkCircle size={36} onClick={() => handler(id)} />;
  return <IoIosCloseCircle size={36} className="pointer" onClick={() => handler(id)} />;
};
