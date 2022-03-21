import React from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";
import { IEntity } from "../store/Models";
import { ItemLink } from "./Elements/ItemLink";

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  color: var(--secondary-color);
  a:hover {
    opacity: 0.5;
  }
  span {
    padding: 0 0.2rem;
  }
  b {
    font-size: 1.2em;
  }
  i {
    font-size: 0.7em;
    padding: 0 0.4em;
  }
`;

const PathParent: FunctionComponent<{ parents?: IEntity[] }> = ({ parents }) => {
  if (!parents) return null;
  if (parents.length === 0) return null;
  return (
    <Styled>
      <b>/</b>
      {parents.map((item, num) => (
        <>
          <ItemLink key={item.id} item={item} />
          <b>/</b>
        </>
      ))}
    </Styled>
  );
};

export const PathHeader: FunctionComponent<{ item?: IEntity }> = ({ item, children }) => {
  if (!item) return null;

  return (
    <>
      <h1>
        <i className={item.icon}> </i>
        {item.name}
      </h1>
      <PathParent parents={item.parents}></PathParent>
      {children}
    </>
  );
};
