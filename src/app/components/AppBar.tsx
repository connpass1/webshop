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
  background-color: var(--primary-color);
  .logo {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${(props) => (props.large ? "120px" : "48px")};
    cursor: pointer;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
    .svg {
      width: ${(props) => (props.large ? "80px" : "48px")};
    }
    svg:hover {
      transform: rotate(22deg);
    }
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
        <div className="logo">
          {!small && <b> интернет </b>}
          <div className="svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
              <circle cx="0" cy="0" r="2.05" fill="currentcolor" />
              <g stroke="currentcolor" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          </div>
          {!small && <b> магазин</b>}
        </div>
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

          <Link to="/cart">
            <Icon type={IconTypes.smallTextRight} caption={!small ? "корзина" : undefined}>
              <SvgCart />
            </Icon>
          </Link>
          <Link to="/profile">
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
