import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ISlug } from "../../models/IFases";
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
  }

  li + li:after {
    padding: 0 4px 0 6px;
    color: black;
    content: "/\\00a0";
    line-height: 1.5;
  }
`;
const BreadcrumbsLarge: React.FC<{ parent: string }> = ({ parent }) => {
  function f(s?: string) {
    const arr: ISlug[] = [];
    if (!s) return arr;
    const ar = s.split("$");
    for (let i in ar) {
      let arr1 = ar[i].split("@");
      const icon = arr1[2] === "null" ? undefined : arr1[2];
      arr.push({ id: parseInt(arr1[1]), name: arr1[0], icon: icon });
    }
    return arr;
  }

  const memo = useMemo(() => f(parent), [parent]);
  return (
    <UL>
      {memo.map((t) => (
        <li key={t.id}>
          <Link to={"/catalog/" + t.id}>
            {t.icon && <Icon src={t.icon} />} {t.name}{" "}
          </Link>
        </li>
      ))}
    </UL>
  );
};
export const Breadcrumbs: React.FC<{ parent?: string }> = ({ parent }) => {
  if (!parent) return null;
  return <BreadcrumbsLarge parent={parent} />;
};
