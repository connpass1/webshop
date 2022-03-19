import classNames from "classnames";
import React from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";
import { IEntity } from "../store/Models";
import { ItemLink } from "./Elements/ItemLink";

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  color: var(--secondary-color);

  align-items: flex-end;

  a:hover {
    opacity: 0.5;
  }
`;

export const PathParent: FunctionComponent<{ parent: IEntity[] }> = ({ parent, children }) => {
  return (
    <Styled>
      {" / "}
      {parent.map((item, num) => (
        <>
          <ItemLink key={item.id} item={item} />
          {" / "}
        </>
      ))}
    </Styled>
  );
};