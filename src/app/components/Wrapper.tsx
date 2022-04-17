import React, { FunctionComponent, useRef, useState } from "react";
import styled from "styled-components";
import AppBar from "./AppBar";
import Navigation from "./Navigation";
import Toggle from "./Elements/Toggle";
import { device, inAnimation, outAnimation } from "./GlobalStyles";
import { Icon } from "./Elements/Icon";
import { useOutsideClick } from "../store/helper";
import CheckContent from "./CheckContent";


const WRAPPER = styled.div<{ open: boolean }>`
  user-select: none;
  color: black;
  display: grid;
  max-width: 100vw;
  min-width: 240px;
  min-height: 100vh;
  grid-template-rows: min-content   5fr  min-content;
  grid-template-columns: 1fr 240px 12px 1440px 1fr;
  gap: 24px 48px;
  grid-template-areas:
      ". appBar appBar appBar ."
      ". nav  .  main  ."
      ". footer footer  footer .";;
  @media ${device.desktop} {
    grid-template-areas:
      "appBar appBar"  
      "nav main"
      "footer footer";
    grid-template-columns:   240px auto  ;
    gap: 12px 48px;
    grid-template-rows: min-content    5fr  min-content;
  };
  //кратно 480
  @media ${device.laptop} {
    gap: 12px 12px;
  };
  @media ${device.tablet} {
    grid-template-areas:
      " appBar"  
      "  main"
      "  footer";
    grid-template-columns:    auto  ;
    gap: 0;
    nav {
      width: ${(props) => (props.open ? "0" : "280px")};
      animation-name: ${(props) => (props.open ? inAnimation : outAnimation)};
      animation-duration: 0.5s;
      position: absolute;
      left: ${(props) => (props.open ? 0 : "-100%")};
    }
  };
`;

const Wrapper: FunctionComponent = (props) => {
  const wrapperRef: React.Ref<any> = useRef(null);
  // @ts-ignore
  useOutsideClick(wrapperRef, () => setNavBarOpened(false));
  const [navBarOpened, setNavBarOpened] = useState(false);
  const toggle = (g: React.SetStateAction<boolean>) => setNavBarOpened(g);

  return (
    <WRAPPER open={navBarOpened}>
      <AppBar>
        <Toggle innerRef={wrapperRef} onToggle={toggle} />
      </AppBar>
      <main>
        <ErrorBoundary>{props.children}</ErrorBoundary>
      </main>
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
          <h1><Icon src={"error"} />Ошибочка.</h1>
          <p>Что-то пошло не так.</p>
          <p><a href="/"> обновить страницу </a></p>
        </>
      );
    }
    return this.props.children;
  }
}
