import React, { FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { theme } from "../GlobalStyles";
import classNames from "classnames";

const Grid = styled.div`
  margin: 12px 0;
  display: grid;
  grid-template-areas: "i1 l i2";
  gap: 8px;
  grid-template-columns: min-content 1fr min-content;
  white-space: nowrap;
  align-items: flex-end;
  justify-self: stretch;
`;
const Links = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: center;
  grid-area: l;

  a {
    color: ${theme.color.secondary};
    padding: 6px;
    text-decoration: none;
    font-size: 1.3rem;
  }

  #i1 {
    grid-area: i1;
  }

  #i2 {
    grid-area: i2;
  }

  .big {
    text-decoration: underline;
    font-weight: bolder;
  }
`;

const Component: FunctionComponent<{ pages: number }> = ({ pages = 0 }) => {
  const location = useLocation();
  const index = location.pathname.lastIndexOf("/");
  const path = location.pathname.slice(0, index + 1);
  const param = Number.parseInt(location.pathname.slice(index + 1, location.pathname.length));
  const a = () => {
    const arr = [];
    while (arr.length < pages) {
      let x: number = arr.length + 1;
      arr.push(x);
    }
    return { "path": path, "arr": arr };
  };
  const o = a();
  const B = useMemo(
    () => (
      <Links>
        {o.arr.map((num) => (
          <Link className={classNames({ "big": (param) === num })} to={o.path + (num)}>{num} </Link>
        ))}
      </Links>
    ),
    [a]// eslint-disable-line react-hooks/exhaustive-deps
  );
  if (pages < 1) return null;
  return <Grid>
    <i id="i1">Страница {param} </i>
    {B}
    <i id="i2"> Страниц {pages}   </i>
  </Grid>;
};
const Component1: FunctionComponent<{ pages?: number }> = ({ pages = 0 }) => {
  if (pages && pages > 1) return <Component pages={pages} />;
  return <div />;
};
export default React.memo(Component1);