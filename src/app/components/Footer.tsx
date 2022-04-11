import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { footerLinks, footerMessage } from "../data";
import { FlexAround } from "./Elements/Styled";

import { theme } from "./GlobalStyles";
import styled from "styled-components";


const Footer=styled.footer` 
    grid-area: footer;
    background-color: ${theme.color.grey};
    padding: 10px;
    color: white;
   
`

const Component: FunctionComponent = () => {


  return (
    <Footer>
      <FlexAround>
        {footerLinks.map((l, key) => (
          <Link key={`f${key}l`} to={l.link}>
            {l.txt}
          </Link>
        ))}
      </FlexAround>
      <FlexAround>{footerMessage}</FlexAround>
    </Footer>
  );
};
export default Component;
