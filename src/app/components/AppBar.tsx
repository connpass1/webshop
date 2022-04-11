import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { phoneNumber, webMenu } from "../data";
import { Card } from "./Blocks/Card";
import { Icon } from "./Elements/Icon";
import { A, FlexAround, FlexCenter, LINK } from "./Elements/Styled";
import { device, theme } from "./GlobalStyles";

const Styled = styled.div`
  grid-area: appBar;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 1.2rem;
  flex-wrap: nowrap;
  background-color: white;
  color: ${theme.color.primary};;
  @media ${device.tablet} {
    background-color: ${theme.color.primary};
    padding: 4px;
    color: white;
  }

  a {
    padding: 8px;
    font-weight: 700;
  }
}

.logo {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${device.tablet} {
    flex-direction: row;
  }

  .icon {
    font-size: 3em;
    padding: 12px;
    @media ${device.tablet} {
      font-size: 1em;
      padding: 0;
    }
  }

  cursor: pointer;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
}

.bar {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

.links {
  display: flex;
  align-items: center;
  flex-direction: row;
}

svg {
  padding: 0 0.5em 0 1em;
}
`;
const AppBar: FunctionComponent<{ small: boolean }> = ({ small, children }) => {
  return (
    <Styled>
      <Link to="/">
        <div className="logo">
          {!small && <b> интернет </b>}
          <Icon src={"logo"} />
          {!small && <b> магазин</b>}
        </div>
      </Link>
      <div className="bar">
        {!small && <FlexAround className="links">
          {webMenu.map((item, key) => (
            <Link key={key} to={item.link}>
              {item.name}
            </Link>
          ))}
        </FlexAround>}
        <FlexCenter>
          <A href={`tel:${phoneNumber}`}>
            <Icon src={"phone"} />
            {!small && phoneNumber}
          </A>
          <Card>   {!small && "корзина"}    </Card>
          <LINK to="/enter">
            <Icon src={"person"} />
            {!small && "личный кабинет"}
          </LINK> </FlexCenter>
      </div>
      {children}
    </Styled>
  );
};
export default AppBar;
