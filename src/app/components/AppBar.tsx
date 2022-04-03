import React from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { phoneNumber, webMenu } from "../data";
import { IoLogoReact, IoPersonOutline } from "react-icons/io5";
import { ISmall } from "./Wrapper";
import { BsTelephone } from "react-icons/bs";
import classNames from "classnames";
import { Card } from "./Blocks/Card";

const Styled = styled.div<{ large: boolean }>`
  grid-area: appBar;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  border-bottom: 1px solid grey;
  background-color: ${(props) => (props.large ? "white" : "var(--primary-color)")};
  a {
    font-size: 1.2rem;
    padding: 8px;
    color: ${(props) => (!props.large ? "white" : "var(--primary-color)")};
    font-weight: 700;
  }
  a:hover {
    opacity: 0.5;
  }
  .logo {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${(props) => (props.large ? "120px" : "48px")};
    cursor: pointer;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
    svg {
      padding: 0;
    }
  }
  .bar {
    min-width: 70%;
    height: 100%;
    justify-content: ${(props) => (props.large ? "space-between" : "center")};
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
  svg {
    padding: 0 0.5em 0 1em;
  }
`;

const AppBar: FunctionComponent<ISmall> = ({ small, children }) => {
  return (
    <Styled large={!small}>
      <Link to="/">
        <div className="logo">
          {!small && <b> интернет </b>}
          <IoLogoReact size={small ? 40 : 80} />
          {!small && <b> магазин</b>}
        </div>
      </Link>

      <div className={classNames("bar", "column")}>
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
          <a href={`tel:${phoneNumber}`} className="flex-center">
            <BsTelephone />
            {!small && phoneNumber}
          </a>

          <Card>{!small && "корзина"} </Card>

          <Link to="/admin" className="flex-center">
            admin
          </Link>
          <Link to="/profile" className="flex-center">
            <IoPersonOutline />
            {!small && "личный кабинет "}
          </Link>
        </div>
      </div>
      {children}
    </Styled>
  );
};
export default AppBar;
