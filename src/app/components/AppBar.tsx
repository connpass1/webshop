import React, { FunctionComponent, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainPhoneNumber, siteNameDown, siteNameUp } from "../../Settings";
import { ISetting } from "../models/IFaces";
import { mapSettings, phone, PropsSetting } from "../store/helper";
import { actionsSettings } from "../store/storeSettings";
import { Card } from "./Blocks/Card";
import { Icon } from "./Elements/Icon";
import { FlexAround, LINK, Row, Span } from "./Elements/Styled";
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
  color: ${theme.color.primary};
  @media ${device.tablet} {
    background-color: ${theme.color.primary};
    padding: 4px;
    color: white;
  } 
  a {  
    ${theme.font.Bold};
   letter-spacing: 0.05em;
  }
  
  @media ${device.tablet} {
    
    span {display:none;}
  }
 

  .icon {
    font-size: 3em;
    padding: 12px;
    @media ${device.tablet} {
      font-size: 1.2em;
      padding: 0;
    }
  }
 
 
.bar {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  svg{
    font-size:1em;
    padding-left:1em;
  }
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
  svg {
    padding: 0 0.5em 0 1em;
  }
`;
const Logo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${device.tablet} {
    flex-direction: row;
    span {
      display: none;
    }
  }
`;
export const A = styled.a`
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  .icon {
    margin-right: -0.2em;
  }
`;
const AppBar: FunctionComponent<PropsSetting> = (props) => {
  useEffect(() => {
    const settingsRequest = () => {
      props.settingsRequest();
    };
    return settingsRequest();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const phoneNumber = useMemo(() => phone(mainPhoneNumber), []);
  const settings = props.settings as ISetting;

  return (
    <Styled>
      <Link to="/">
        <Logo>
          <Span after={siteNameUp} />
          <Icon src={"logo"} />
          <Span after={siteNameDown} />
        </Logo>
      </Link>
      <div className="bar">
        <FlexAround className={"tabletNo"}>
          {settings?.appBarLinks.map((item, key) => (
            <Link key={key} to={"/page/" + item.id}>
              {item.name}
            </Link>
          ))}
        </FlexAround>
        <Row className={"center"}>
          <A href={`tel:${mainPhoneNumber}`}>
            <Icon src={"phone"} />
            <Span after={phoneNumber} />
          </A>
          <Card>
            <Span after={"корзина"} />
          </Card>
          <LINK to="/profile">
            <Icon src={"person"} />
            <Span after={"личный кабинет"} />
          </LINK>
        </Row>
      </div>
      {props.children}
    </Styled>
  );
};
const connected = connect(mapSettings, actionsSettings)(AppBar);
export default connected;
