import React from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobilMenu, webMenu } from "../data";
import Icon from "./Icon";

import { ISmall } from "./Wrapper";

const Styled = styled.div<{ large: boolean }>`
  grid-area: appBar;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  background-color: var(--main-bg-color);
  .logo {
    height: 100%;
    display: flex;
    flex-direction: columns;
    align-items: center;
    background-repeat: no-repeat center center fixed;
    background-image: ${(props) => (props.large ? "url(logo120.png)" : "url(logo48.png)")};
    width: ${(props) => (props.large ? "120px" : "48px")};
    height: ${(props) => (props.large ? "120px" : "48px")};
    background-size: cover;
    cursor: pointer;
  }
  a {
    font-size: 1.3rem;
    padding: 8px;
  }
  .menuLinks {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex: 1;
  }
  .menuButton {
    width: var(--button-icon-size);
    height: var(--button-icon-size);
    padding: 0.25em;
  }
`;

const AppBar: FunctionComponent<ISmall> = ({ small, children }) => {
  const menu = small ? mobilMenu : webMenu;
  return (
    <Styled large={!small}>
      <Link to="/">
        <div className="logo" />
      </Link>
      <div className="menuLinks">
        {menu.map((item, key) => (
          <Link key={key} to={item.link}>
            {item.text}
          </Link>
        ))}
      </div>
      {children}
    </Styled>
  );
};
export default AppBar;
