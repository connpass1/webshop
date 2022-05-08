import React, { FunctionComponent, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { copyrights } from "../../Settings";
import { CatalogLink } from "../pages/CatalogPage";
import { mapSettings, PropsSetting } from "../store/helper";
import { actionsSettings } from "../store/storeSettings";
import AdminLinks from "./adminka/AdminLinks";
import { Icon } from "./Elements/Icon";
import { FlexAround } from "./Elements/Styled";
import { device, theme } from "./GlobalStyles";

export const Nav = styled.nav`
  padding-top: 12px;
  grid-area: nav;
  display: flex;
  align-items: stretch;
  align-content: flex-end;
  flex-direction: column;
  min-width: 240px;
  justify-items: center;
  border-radius: 0 8px;
  box-shadow: ${theme.shadow};
  background-color: white;
  border-right: 1px solid ${theme.color.primary};

  color: ${theme.color.primary};
  max-width: calc (100% - 84px);

  .tabletUp {
    display: none;
    @media ${device.tablet} {
      margin: 12px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      border-top: 1px solid currentColor;
    }
  }

  a,
  div {
    padding: 4px 18px;
  }
`;
const Footer = styled.footer`
  grid-area: footer;
  background-color: ${theme.color.grey};
  padding: 10px;
  color: white;
`;
const Component: FunctionComponent<PropsSetting> = (props) => {
  const categoryLinks = useMemo(
    () => props.settings?.categoryLinks && props.settings.categoryLinks.map((item) => <CatalogLink key={item.id} item={item} />),

    [props.settings]
  );
  const appBarLinks = useMemo(
    () =>
      props.settings?.appBarLinks?.map((item) => (
        <Link key={item.id} to={"/page/" + item.id}>
          {item.name}
        </Link>
      )),
    [props.settings]
  );
  const footerLinks = useMemo(
    () =>
      props.settings?.footerLinks?.map((item) => (
        <Link key={item.id} to={"/page/" + item.id}>
          {item.name}
        </Link>
      )),
    [props.settings]
  );
  return (
    <>
      <Nav>
        <Link to="/catalog/1" className={"root"}>
          <Icon src="home" />
          Меню
        </Link>
        {categoryLinks}
        <div className={"tabletUp"}>{appBarLinks}</div>
        <AdminLinks />
      </Nav>
      <Footer>
        <FlexAround>{footerLinks}</FlexAround>
        <FlexAround>{copyrights}</FlexAround>
      </Footer>
    </>
  );
};
const Connected = connect(mapSettings, actionsSettings)(Component);
export default Connected;
