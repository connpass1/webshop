import React from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Menu from "./Menu";

const StyledWrapper = styled.div`
  background: papayawhip;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content minmax(90vh, max-content) min-content;
  gap: 0px 0px;
  grid-template-areas:
    "menu header "
    "menu main  "
    "menu footer  ";
  padding: 0;
`;
const StyledMenu = styled.section`
  background: papaya;
  display: grid;
  flex-direction: row;
  grid-area: menu;
`;

const GlobalStyle = createGlobalStyle`
  body {
   background-color: grey;
    color:  white   ; 
    margin: 0; 
  }
`;
const Header = styled.div`
  grid-area: header;
  background-color: red;
  padding: 10px;
`;

const Main = styled.main`
  grid-area: main;
  background-color: blue;
  padding: 10px;
`;
const Footer = styled.div`
  grid-area: footer;
  background-color: grey;
  padding: 10px;
`;
const Wrapper: FunctionComponent = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <StyledWrapper>
        <Header>Header</Header>
        <Footer>footer</Footer>
        <Main> {children}</Main>
        <StyledMenu> </StyledMenu>
      </StyledWrapper>
    </>
  );
};
export default Wrapper;
