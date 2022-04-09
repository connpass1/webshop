import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { phoneNumber, webMenu } from "../data";
import { IoLogoReact } from "react-icons/io5";
import classNames from "classnames";
import { Card } from "./Blocks/Card";
import { Icon } from "./Elements/Icon";
import { A, FlexAround, FlexCenter, LINK } from "./Elements/Styled";

const Styled = styled.div<{ large: boolean }>`
  grid-area: appBar; 
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: ${(props) => (props.large ? "10px" :0)};
  background-color: ${(props) => (props.large ? "white" : "var(--primary-color)")};
  font-size: 1.2rem;
  flex-wrap: nowrap;
    

  a {
    padding: 8px;
    color: ${(props) => (!props.large ? "white" : "var(--primary-color)")};
    font-weight: 700;
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
    flex-direction: row;
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

const AppBar: FunctionComponent<{small:boolean}> = ({ small, children }) => {
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
          <FlexAround  className={  "links"   }  >
            {webMenu.map((item, key) => (
              <Link key={key} to={item.link}>
                {item.txt}
              </Link>
            ))}
          </FlexAround>
        )}
         <FlexCenter  className= "links"  >
          <A href={`tel:${phoneNumber}`}  >
            <Icon src={"phone"} />
            {!small && phoneNumber}
          </A>
          <Card>{!small && "корзина"} </Card>
          <LINK to="/user/profile" className="row">
            <Icon src={"person"} />
            {!small && "личный кабинет "}
          </LINK> </FlexCenter>
        </div>

      {children}
    </Styled>
  );
};
export default AppBar;
