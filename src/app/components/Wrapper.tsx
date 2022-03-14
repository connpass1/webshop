import classNames from "classnames";
import React, { useState } from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";
import AppBar from "./AppBar";
import Catalog from "./Catalog";
import { useIsSmall } from "./hooks";
import "./main.css";
import { keyframes } from "styled-components";
export interface ISmall {
  small?: boolean;
}
const inAnimation = keyframes`
 0% {   left: -200px;opacity: 0.5; } 
 100% {   left:0; opacity: 1; }
`;
const outAnimation = keyframes`
 0% {   left: 0;opacity:1; } 
 100% {   left:-400px; opacity: 0.5; }
`;

const Nav = styled.nav<{ large: boolean; open: boolean }>`
  min-height: 100vh;
  display: flex;
  flex-direction: columns;
  min-width: 240px;
  padding: 8px;
  grid-area: nav;
  background-color: rgb(116, 98, 98);
  position: ${(props) => (props.large ? "relative" : "absolute")};
  left: ${(props) => (props.large || props.open ? "0" : "-100%")};
  animation-name: ${(props) => (props.large || props.open ? inAnimation : outAnimation)};
  animation-duration: 0.5s;
`;

const Footer = styled.div`
  grid-area: footer;
  background-color: grey;
  padding: 10px;
`;

const Wrapper: FunctionComponent = ({ children }) => {
  const [navBarOpened, setNavBarOpened] = useState(false);
  const onNavClick = () => {
    setNavBarOpened(!navBarOpened);
  };
  const small = useIsSmall();

  return (
    <>
      <div className="wrapper">
        <AppBar small={small}>
          {small ? (
            <div className={classNames("button", "menuButton")} onClick={onNavClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="currentColor" viewBox="0 0 16 16">
                <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" />
              </svg>
            </div>
          ) : (
            <div />
          )}
        </AppBar>
        <Footer>footer</Footer>
        <main> {children}</main>

        <Nav large={!small} open={navBarOpened}>
          <Catalog />
        </Nav>
      </div>
    </>
  );
};
export default Wrapper;
