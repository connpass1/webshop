import React, { FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import { mapSettings, PropsSetting } from "../store/helper";
import { Link } from "react-router-dom";

import { device, theme } from "./GlobalStyles";
import { Icon } from "./Elements/Icon";
import { connect } from "react-redux";
import { actionsSettings } from "../store/storeSettings";
import { FlexAround } from "./Elements/Styled";
import AdminLinks from "./adminka/AdminLinks";
import { CatalogLink } from "../pages/CatalogPage";

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

          a, div {
            padding: 4px 18px;
          }
  `
;
const Footer = styled.footer`
  grid-area: footer;
  background-color: ${theme.color.grey};
  padding: 10px;
  color: white;
`;
const Component: FunctionComponent<PropsSetting> = (props) => {

  const categoryLinks = useMemo(() =>
      props.settings?.categoryLinks && props.settings.categoryLinks.map((item) => (
        <CatalogLink key={item.id} item={item} />
      ))

    , [props.settings]);
  const appBarLinks = useMemo(() =>
      props.settings?.appBarLinks && props.settings.appBarLinks.map((item) => (
        <CatalogLink key={item.id} item={item} />
      ))
    , [props.settings]);
  const footerLinks = useMemo(() =>
      props.settings?.footerLinks && props.settings.footerLinks.map((item) => (
        <CatalogLink key={item.id} item={item} />
      ))
    , [props.settings]);
  return (
    <>
      <Nav>
        <Link to="/catalog/1" className={"root"}> <Icon src={"home"} />Каталог </Link>
        {categoryLinks}
        <div className={"tabletUp"}>
          {appBarLinks}
        </div>
        <AdminLinks />


      </Nav>
      <Footer>
        <FlexAround>
          {footerLinks}
        </FlexAround>
        <FlexAround>Copyright (c) 2022 connpass@andraft.com</FlexAround>
      </Footer>
    </>
  );

};
const connected = connect(mapSettings, actionsSettings)(Component);
export default connected;
