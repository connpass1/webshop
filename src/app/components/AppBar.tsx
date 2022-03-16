import React from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { phoneNumber, webMenu } from "../data";
import Icon, { IconTypes, SvgCart } from "./Icon";

import { ISmall } from "./Wrapper";
import { SvgProfile, SvgPhone } from "./Icon";

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
    font-size: 1.2rem;
    padding: 8px;
    color: #ffffff;
  }
  a:hover {
    color: #ffffff77;
  }
  .links {
    display: flex;
    align-items: center;

    direction: columns;
    font-size: 1.2rem;
  }

  .menuButton {
    width: var(--button-icon-size);
    height: var(--button-icon-size);
    padding: 0.25em;
  }
`;

const AppBar: FunctionComponent<ISmall> = ({ small, children }) => {
  return (
    <Styled large={!small}>
      <Link to="/">
        <div className="logo" />
      </Link>

      <div className="column" style={{ width: "100%" }}>
        {!small && (
          <div className="links" style={{ justifyContent: "space-around" }}>
            {webMenu.map((item, key) => (
              <Link key={key} to={item.link}>
                {item.txt}
              </Link>
            ))}
          </div>
        )}
        <div className="links" style={{ justifyContent: "center" }}>
          <a href={`tel:${phoneNumber}`}>
            <Icon type={IconTypes.smallTextRight} caption={!small ? phoneNumber : undefined}>
              <SvgPhone />
            </Icon>
          </a>

          <Link to="cart">
            <Icon type={IconTypes.smallTextRight} caption={!small ? "корзина" : undefined}>
              <SvgCart />
            </Icon>
          </Link>
          <Link to="profile">
            <Icon type={IconTypes.smallTextRight} caption={!small ? "личный кабинет" : undefined}>
              <SvgProfile />
            </Icon>
          </Link>
        </div>
      </div>
      {children}
    </Styled>
  );
};
export default AppBar;
