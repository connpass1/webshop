import React, { FunctionComponent, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card } from "./Blocks/Card";
import { Icon } from "./Elements/Icon";
import { A, FlexAround, FlexCenter, LINK, Span } from "./Elements/Styled";
import { device, theme } from "./GlobalStyles";
import { connect } from "react-redux";
import { mapSettings, phone, PropsSetting } from "../store/helper";
import { actionsSettings } from "../store/storeSettings";

const Styled = styled.div`
  grid-area: appBar;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 1.2rem;
  flex-wrap: nowrap;
  background-color: white;
  color: ${theme.color.primary};
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
}

.bar {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

.tabletNo {
  @media ${device.tablet} {
    display: none;
  }

  .toggle {
    display: none;
    @media ${device.tablet} {
      display: block;
    }
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

const AppBar: FunctionComponent<PropsSetting> = (props) => {

  useEffect(() => {
    const settingsRequest = () => {
      props.settingsRequest();
    }
   return settingsRequest();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  const phoneNumber = useMemo(() =>
    phone(props.settings?.phoneNumber), [props]);

  return (
    <Styled>
      <Link to="/">
        <div className="logo">
          <Span after={"интернет"} />
          <Icon src={"logo"} />
          <Span after={"магазин"} />

        </div>
      </Link>
      <div className="bar">
        <FlexAround className={"tabletNo"}>

          {props.settings?.appBarLinks.map((item, key) => (
            <Link key={key} to={"/page/" + item.id}>
              {item.name}
            </Link>
          ))}
        </FlexAround>
        <FlexCenter>
          <A href={`tel:${props.settings?.phoneNumber}`}>
            <Icon src={"phone"} />
            <Span after={phoneNumber} />

          </A>
          <Card> <Span after={"корзина"} /> </Card>
          <LINK to="/enter">
            <Icon src={"person"} /><Span after={"личный кабинет"} />

          </LINK> </FlexCenter>
      </div>
      {props.children}
    </Styled>
  );
};
const connected = connect(mapSettings, actionsSettings)(AppBar);
export default connected;
