import React from "react";
import styled from "styled-components";

export const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const FlexAround = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const Column = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
  return <div className="column">{props.children}</div>;
};
export const Row = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined }) => {
  return <div className="row">{props.children}</div>;
};

export const RowSpaceBetween = styled.div`
  margin: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const Table = styled.table`
  margin: 12px 0;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  th,
  td {
    border: 1px solid;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: var(--grey-color-light);
  }
  tr:hover {
    background-color: var(--secondary-color-light);
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: var(--secondary-color);
    color: white;
  }
`;
export const Input = styled.input`
  padding: 8px 4px;
  max-width: 240px;
  margin-bottom: 12px;
  font-size: 1.1rem;
  margin-right: 2em;
`;
