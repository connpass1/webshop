import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ISlug } from "../../store/Models";
import { FlexEnd } from "./Styled";
import { Icon } from "./Icon";
const UL = styled.ul`
  color: var(--secondary-color);
  flex-direction: row;
  display: flex;
  font-size: 16px;
  align-content: center;
  align-items: center;
  flex-wrap: nowrap; 
  li {
    display: flex;
    align-content: center;
    align-items: center;
  }

  li a:hover {
    text-decoration: underline;
  }

  li + li:before {
    padding: 0 8px 0 12px;
    color: black;
    content: "/\\00a0"; 
  } 
  a {
    color: currentColor;
    display: inline-flex;
  } 
`;

export const Breadcrumbs: React.FC<{ parent?: string }> = ({ parent }) => {
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
    <FlexEnd>
      <UL>
        <li>
          <Link to={"/catalog/0"}> <Icon src={"home"} /> Каталог </Link></li>
        {memo.map(t => <li key={t.id}>
          <Link to={"/catalog/" + t.id}>
            {t.icon  &&  <Icon src={ t.icon  } />} {t.name}    </Link>
        </li>)}
      </UL></FlexEnd>
  );
};
