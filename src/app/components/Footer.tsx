import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { footerLinks, footerMessage } from "../data";
import { FlexAround } from "./Elements/Styled";
import { device, theme } from "./GlobalStyles";
import styled from "styled-components";

const Footer = styled.footer`
  grid-area: footer;
  background-color: ${theme.color.grey};
  padding: 10px;
  color: white;
`;
const Test = styled.div`
  :before {
    content: "max";
    @media ${device.desktop} {
      content: "destop";
    }
    @media ${device.laptopL} {
      content: "laptopL";
    }
    @media ${device.laptop} {
      content: "laptop";
    }
    @media ${device.tablet} {
      content: "tablet";
    }
    @media ${device.mobile} {
      content: "mobil";
    }
  }
`;
const Component: FunctionComponent = () => {
  return (
    <Footer>
      <FlexAround><Test />
        {footerLinks.map((l, key) => (
          <Link key={`f${key}l`} to={l.link}>
            {l.name}
          </Link>
        ))}
      </FlexAround>
      <FlexAround>{footerMessage}</FlexAround>
    </Footer>
  );
};
export default Component;
