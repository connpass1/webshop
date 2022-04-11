import React, { FunctionComponent, useState } from "react";
import styled, { keyframes } from "styled-components";
import AppBar from "./AppBar";
import Navigation, { Nav } from "./Navigation";
import Toggle from "./Elements/Toggle";
import Footer from "./Footer";
import { device, theme, useIsSmall } from "./GlobalStyles";

const Div = styled.div`
  user-select: none;
  background-color: white;
  color: black;
  margin: 0;
  display: grid;
  width: 100%; 
  min-width: 240px;
  padding: 0;
  min-height: 100vh; 
  grid-template-rows: min-content   5fr  min-content;
  grid-template-columns: 1fr 240px 12px 1440px 1fr;
  gap:  24px 48px;
  grid-template-areas:
      ".  appBar appBar appBar . "
      " . nav  .  main  .   "
      ". footer footer  footer ."; 
  main{
    grid-area: main;
    box-shadow: ${theme.shadow };
 
    padding: 10px;
    border-radius: 4px;
    user-select: text;
    display: flex;
    flex-direction: column;
    
  };
  @media ${device.desktop} {
    grid-template-areas:
      "  appBar  appBar    "  
      "   nav    main     "
      "  nav   footer   ";
    grid-template-columns:   240px auto  ;
    gap:  12px 48px;
    grid-template-rows: min-content    5fr  min-content;
  };

  //кратно 480

  @media ${device.laptopL} {
    gap:  12px 12px; 
};
  
 
  @media ${device.tablet} {
    grid-template-areas:
      "   appBar    "
      "       main     "
      "     footer   ";
    grid-template-columns:      100%  ;
    gap:  0;
    nav { 
      border-radius: 0;
      box-shadow: none;
      
    } 
    main{
      padding:0;
      
    }
    
  }; 
a {
  outline: none;
  text-decoration: none;
  color: currentColor;
  font-size: 1.2em;
  cursor: pointer;
}
  
`;

const Wrapper: FunctionComponent = ({ children }) => {
  const [navBarOpened, setNavBarOpened] = useState(false);
  const small = useIsSmall();
  const toggle = (g: React.SetStateAction<boolean>) => setNavBarOpened(g);
  const closeNav = (g: React.SetStateAction<boolean>) => {
    if (navBarOpened) toggle(false);

  };

  return (
    <Div>
      <AppBar small={small}>{small ? <Toggle onToggle={toggle} toggled={navBarOpened} /> : <div />}
      </AppBar>
      <main>ooo{small+"hhhh"}
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
        <Navigation closeNav={closeNav}   large={!small} open={navBarOpened}>  </Navigation>

      <Footer />
    </Div>
  );
};
export default Wrapper;

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: any) {
    console.log(error);
    return { hasError: true, error: error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Ошибочка.</h1>
          <p>Что-то пошло не так.</p>
          <p><a href="/"> обновить страницу </a></p>
        </>
      );
    }
    return this.props.children;
  }
}
