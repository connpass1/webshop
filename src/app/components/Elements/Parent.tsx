import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IEntity } from "../../store/Models";
import { FlexEnd } from "./Styled";

const DIV = styled(FlexEnd)`
  color: var(--primary-color);
  font-size: 1em;
  padding: 0 0.5em;
  a {
    text-decoration: underline;
  }
`;

export const Parent: React.FC<IEntity> = (parent?) => {
  if (!parent) return null;
  return (
    <DIV>
      <div>
        <Link to={`/catalog/${parent.id}`}>{parent.name}</Link>
      </div>
    </DIV>
  );
};
