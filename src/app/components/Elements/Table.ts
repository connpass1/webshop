import React from "react";
import styled from "styled-components";
import { device, theme } from "../GlobalStyles";
export const ChildrenGreed:React.FC<any> = (props) => { 
    return  props.children; 
}

export const GridTable = styled.div`
  background-color: ${theme.color.greyLight};
  display: grid;
  gap: 1px;
  overflow-x: auto;
  overflow-y: hidden;

  div {
    padding: 0 4px;
  }

  align-self: center;
  justify-self: center;
  gap: 1px;
  padding: 1px;


  min-width: 600px;
  @media ${device.tablet} {
    overflow-x: auto;
    
  }
}

`;
export const TD = styled.div`
  background-color: white;
  line-height: 32px;
  height: 32px;

  a {
    font-size: 1rem
  }
;
`;
export const TH = styled.div`
  line-height: 40px;
  height: 40px;
  background-color: ${theme.color.primary};
  color: white;
  text-align: center;
  font-weight: bold;
`;
export const TDC = styled(TD)`
  text-align: center;
`;
export const TF = styled.div`
  font-style: italic;
  line-height: 28px;
  height: 28px;
  background-color: ${theme.color.grey};
  color: white;
  font-weight: lighter;
  font-size: 0.9rem;

`;

export const TI = styled(TD)`
  color: ${theme.color.secondary};
`;
