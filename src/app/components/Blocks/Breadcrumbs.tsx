import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ISlug } from "../../models/IFases";
import { Icon } from "../Elements/Icon";
import { theme } from "../GlobalStyles";

const UL = styled.ul`
  color: ${theme.color.secondary};
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
  margin: 0;

  li {
    display: flex;
    align-content: center;
  }

  li a:hover {
    text-decoration: underline;
  }

  li + li:after {
    padding: 0 8px 0 12px;
    color: black;
    content: "/\\00a0";
    line-height: 1.5;
  }

  a {
    color: currentColor;
    display: inline-flex;
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
      {memo.map(t => <li key={t.id}>
        <Link to={"/catalog/" + t.id}>
          {t.icon && <Icon src={t.icon} />} {t.name}    </Link>
      </li>)}
    </UL>
  );
};
export const Breadcrumbs: React.FC<{ parent?: string }> = ({ parent }) => {

  if (!parent) return null;
  return <BreadcrumbsLarge parent={parent} />;
};