import React from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";
import { mobilMenu, webMenu } from "../data";
import { ISmall } from "./Wrapper";

const Styled = styled.div<{ large: boolean }>`
  grid-area: appBar;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  color: var(--main-bg-color);

  .outer {
    display: flex;
    flex-direction: columns;
    align-items: center;
    .logo {
      height: 100%;
      display: flex;
      flex-direction: columns;
      align-items: center;
      background-repeat: no-repeat center center fixed;
      background-image: url("logo192.png");
      width: ${(props) => (props.large ? "120px" : "60px")};
      height: ${(props) => (props.large ? "120px" : "60px")};
      background-size: cover;
    }
  }
  a {
    color: var(--main-bg-color);
    font-size: 1.3rem;
    padding: 8px;
  }
  .menuLinks {
    display: flex;
    align-items: center;
    justify-content: space-around;
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
      <div className="outer">
        <div className="logo" />
      </div>
      <div className="menuLinks">
        <p>{"small" + small}</p>;
        {menu.map((item, key) => (
          <a key={key} href="link">
            {item.text}
          </a>
        ))}
      </div>
      {children}
    </Styled>
  );
};
export default AppBar;
