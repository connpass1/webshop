import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import AppBar from "./AppBar";
import Navigation from "./Navigation";
import Toggle from "./Elements/Toggle";
import { device, inAnimation, outAnimation } from "./GlobalStyles";
import { H1 } from "./Elements/Icon";
import CheckContent from "./CheckContent";

const WRAPPER = styled.div<{ open: boolean }>`
  user-select: none;
  color: black;
  display: grid;
  max-width: 100vw;
  min-width: 240px;
  grid-template-rows: min-content  min-content  1fr  min-content;
  grid-template-columns: 1fr 240px 680px 680px 1fr;
  gap: 24px 48px;
  min-height: 100vh;
  grid-template-areas:
      " .  appBar appBar appBar   ."
      " .  nav    h         b  ."
      " .  nav    main   main  ."
      " .  footer footer  footer   .";
  justify-items: stretch;
  justify-content: stretch;
  align-content: stretch;
  align-items: stretch;
  @media ${device.desktop} {
    grid-template-areas:
      "appBar appBar appBar"  
      "nav  h  b"
      "nav main main"
      "footer footer footer";
    grid-template-columns:   240px auto  auto ;
    gap: 12px 48px;
    grid-template-rows: min-content min-content  1fr  min-content;
  };
  @media ${device.laptop} {
    grid-template-areas:
      "appBar appBar appBar"  
      "nav  b  b"
      "nav  h  h"
      "nav main main"
      "footer footer footer";
    grid-template-columns:   240px auto  auto  ;
    gap: 12px 24px;
    grid-template-rows: min-content min-content min-content  1fr   min-content;

  };
  @media ${device.tablet} {
    grid-template-areas:
      "appBar" 
      "h"
      "main" 
      "b"
      "footer"
  ;
    grid-template-columns:  auto ;
    grid-template-rows: min-content min-content   1fr min-content  min-content;
    gap: 6px;
    nav {
      width: ${(props) => (props.open ? "0" : "280px")};
      animation-name: ${(props) => (props.open ? inAnimation : outAnimation)};
      animation-duration: 0.5s;
      position: absolute;
      left: ${(props) => (props.open ? 0 : "-100%")};
      min-height: 100vh;
    }
  };
`;

const Wrapper: FunctionComponent = (props) => {
  const [navBarOpened, setNavBarOpened] = useState(false);
  const openHandler = () => {
    if (!navBarOpened) setNavBarOpened(true);
  };
  const closeHandler = () => {
    if (navBarOpened) setNavBarOpened(false);
  };
  return (
    <WRAPPER open={navBarOpened}>
      <AppBar>
        <Toggle openHandler={openHandler} closeHandler={closeHandler} openBar={navBarOpened} />
      </AppBar>
      <ErrorBoundary>{props.children}</ErrorBoundary>
      <CheckContent />
      <Navigation />
    </WRAPPER>
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
          <H1 src={"error"}> Ошибочка!</H1>
          <main>
            <div  >
              <p>Что-то пошло не так.</p>
              <p> Oбновите страницу </p></div>
          </main>
        </>
      );
    }
    return this.props.children;
  }
}
