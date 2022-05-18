import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../GlobalStyles";

export const FlexAround = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

export const LINK = styled(Link)`
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  .icon {
    margin-right: -0.2em;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Span = styled.span<{ after: string | undefined }>`
  :after {
    content: ${(props) => props.after && "'" + props.after + "'"};
  }
`;
export const MainStart = styled.main`
  align-content: flex-start;

  flex-wrap: nowrap;
`;
export const MainCenter = styled.main`
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
`;
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
export const BackButton: React.FC<{ text?: string }> = ({ text = "Продолжить..." }) => {
  const history = useHistory() as any;
  const handle = () => history.goBack();
  return <button onClick={handle}>{text} </button>;
};
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
