import React, { FunctionComponent, useState } from "react";
import styled, { keyframes } from "styled-components";
import AppBar from "./AppBar";
import Navigation from "./Navigation";
import { useIsSmall } from "./hooks";
import Toggle from "./Elements/Toggle";
import Footer from "./Footer";
const inAnimation = keyframes`
 0% {   left: -200px;opacity: 0.5; } 
 100% {   left:0; opacity: 1; }
`;
const outAnimation = keyframes`
 0% {   left: 0;opacity:1; } 
 100% {   left:-400px; opacity: 0.5; }
`;
const Nav = styled.nav<{ large: boolean; open: boolean }>`
  position: ${(props) => (props.large ? "relative" : "absolute")};
  left: ${(props) => (props.large || props.open ? "0" : "-100%")};
  animation-name: ${(props) => (props.large ? undefined : props.open ? inAnimation : outAnimation)};
  animation-duration: 0.5s;
`;
const Wrapper: FunctionComponent = ({ children }) => {
  const [navBarOpened, setNavBarOpened] = useState(false);
  const small = useIsSmall();
  const toggle= (g: React.SetStateAction<boolean>) => setNavBarOpened(g)
  return (
    <div className="wrapper">
      <AppBar small={small}>{small ? <Toggle onToggle={toggle} /> : <div />}</AppBar>
      <main>

        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Nav large={!small} open={navBarOpened}>
        <Navigation />
      </Nav>
      <Footer  />
    </div>
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
        </>
      );
    }
    return this.props.children;
  }
}
