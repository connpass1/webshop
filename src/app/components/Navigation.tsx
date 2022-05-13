import React, { FunctionComponent, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { copyrights } from "../../Settings";
import { ISlug } from "../models/IFaces";
import { mapSettings, PropsSetting } from "../store/helper";
import { actionsSettings } from "../store/storeSettings";
import AdminLinks from "./adminka/AdminLinks";
import { Icon, TextIcon } from "./Elements/Icon";
import { FlexAround } from "./Elements/Styled";
import { device, theme } from "./GlobalStyles";

const LinkMenu = styled(Link)`
  ${theme.font.Bold};
  color: ${theme.color.primary};
  text-decoration: none;
`;

const LinkPage = styled(LinkMenu)`
  display: none;
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
  }
`;
const LinkA = styled(Link)`
  ${theme.font.Pattaya};
  color: ${theme.color.primary};
  text-decoration: none;
`;
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
  hr {
  }
  a,
  div {
    padding: 4px 18px;
    :hover {
      background-color: ${theme.color.primaryLight};
    }
  }
`;
const Footer = styled.footer`
  grid-area: footer;
  background-color: ${theme.color.grey};
  padding: 10px;
  color: white;
`;
const CatalogLink: React.FC<{ item: ISlug; onClick?: any }> = ({ item, onClick }) => {
  const handle = () => {
    if (onClick) onClick();
  };

  return (
    <LinkA to={`/catalog/${item.id}`} onClick={handle}>
      <TextIcon {...item} />
    </LinkA>
  );
};
const Component: FunctionComponent<PropsSetting> = (props) => {
  const categoryLinks = useMemo(
    () => props.settings?.categoryLinks && props.settings.categoryLinks.map((item) => <CatalogLink key={item.id} item={item} />),

    [props.settings]
  );
  const appBarLinks = useMemo(
    () =>
      props.settings?.appBarLinks?.map((item) => (
        <LinkPage key={item.id} to={"/page/" + item.id}>
          <TextIcon {...item} />
        </LinkPage>
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
        <LinkMenu to="/catalog/1">
          <Icon src="home" />
          Меню
        </LinkMenu>
        <hr />
        {categoryLinks}
        <hr />
        {appBarLinks}
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
