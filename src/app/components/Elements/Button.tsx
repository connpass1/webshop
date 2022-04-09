import React, { useState } from "react";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { Redirect } from "react-router-dom";
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
    padding: 0 0  0 0.5em;
  }
`;
export const ButtonSecondary = styled.button<Props>`
  color: var(--secondary-color);
  border: none;
   background-color: transparent;
  font-size: 1.2rem;
 font-family: "DejaVu Serif Condensed";
 text-decoration: ${(props) => (props.outlined ? "underline" : "none")};
 font-weight: ${(props) => (props.outlined ? 800 : 400)};
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : "flex-start")};
  :disabled {
    background-color: transparent;
    color: var(--grey-color);
  }
`;


export const BackToCatalog = () => {
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Redirect to="/catalog/1" />;
  return <ButtonSecondary onClick={() => setRedirect(true)}>вернуться к покупкам</ButtonSecondary>;
};
export const CheckBox: React.FC<{ id: number; handler: any; check: boolean }> = ({ id, handler, check = false }) => {
  if (check) return <IoIosCheckmarkCircle size={36} onClick={() => handler(id)} />;
  return <IoIosCloseCircle size={36} className="pointer" onClick={() => handler(id)} />;
};
