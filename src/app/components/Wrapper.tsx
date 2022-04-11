import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import AppBar from "./AppBar";
import Navigation from "./Navigation";
import Toggle from "./Elements/Toggle";
import Footer from "./Footer";
import { device, useIsSmall } from "./GlobalStyles";
import { Icon } from "./Elements/Icon";

const WRAPPER = styled.div`
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
      " appBar "
      " main "
      " footer ";
    grid-template-columns:  100%  ;
    gap: 0;
  };
`;
const Wrapper: FunctionComponent = ({ children }) => {
  const [navBarOpened, setNavBarOpened] = useState(false);
  const small = useIsSmall();
  const toggle = (g: React.SetStateAction<boolean>) => setNavBarOpened(g);
  const closeNav = () => {
    if (navBarOpened) toggle(false);
  };
  return (
    <WRAPPER>
      <AppBar small={small}>{small ? <Toggle onToggle={toggle} toggled={navBarOpened} /> : <div />}
      </AppBar>
      <main>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Navigation closeNav={closeNav} large={!small} open={navBarOpened}> </Navigation>
      <Footer />
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
