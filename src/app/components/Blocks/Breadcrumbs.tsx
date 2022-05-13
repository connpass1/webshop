import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ISlug } from "../../models/IFaces";
import { Icon } from "../Elements/Icon";
import { device, theme } from "../GlobalStyles";

const UL = styled.ul`
  grid-area: b;
  color: ${theme.color.secondary};
  flex-direction: row;
  flex-wrap: nowrap;
  display: flex;
  justify-content: flex-end;

  a {
    font-size: 15px;
    font-style: italic !important;
    align-items: center;
    line-height: 15px;
    color: currentColor;
    display: inline-flex;
    :hover {
      text-decoration: underline;
    }
  }

  @media ${device.mobile} {
    display: none;
  }

  li {
    font-size: 15px;
    display: flex;
    align-content: center;
    :after {
      padding: 0 0.5em;

      content: "/";
      justify-self: center;
      align-self: center;
    }
  }
`;
const BreadcrumbsLarge: React.FC<{ parent: ISlug[]; isAdmin: boolean }> = ({ parent, isAdmin }) => {
  return (
    <UL>
      {parent.map((t) => (
        <li key={t.id}>
          <Link to={isAdmin ? "/admin/catalog/" + t.id : "/catalog/" + t.id}>
            {t.icon && <Icon src={t.icon} />} {t.name}
          </Link>
        </li>
      ))}
    </UL>
  );
};
const Breadcrumbs: React.FC<{ parent?: any; isAdmin?: boolean }> = ({ parent, isAdmin = false }) => {
  if (!parent) return null;
  return <BreadcrumbsLarge parent={parent as ISlug[]} isAdmin={isAdmin} />;
};
export default Breadcrumbs;
