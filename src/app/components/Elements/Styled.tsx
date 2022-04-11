import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../GlobalStyles";

export const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;

`;
export const FlexAround = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;
export const A = styled.a`
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center; 
  .icon {
    margin-right: -0.2em;
  }
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
  `
;
export const FlexCenter = styled.div`
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
`;
export const Column = styled.div`
          display: flex;
          flex-direction: column;
  `
;


export const FlexBetween = styled.div`
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
    background-color:  ${theme.color.greyLight};
  }

  tr:hover {
    background-color: ${theme.color.secondaryLight};
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: ${theme.color.secondary};
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
