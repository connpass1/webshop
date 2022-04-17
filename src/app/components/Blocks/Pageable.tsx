import { FlexBetween } from "../Elements/Styled";
import React, { FunctionComponent, useMemo } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { theme } from "../GlobalStyles";
import classNames from "classnames";

const Links = styled.div` 
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center; 
  a {
    color: ${theme.color.secondary};
    padding: 6px;
    text-decoration: none;
    font-size: 1.3rem;
  }

  .big {
     text-decoration: underline;
    font-weight: bolder;
  }
`;

const Component: FunctionComponent<{ pages: number }> = ({ pages }) => {
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
if(pages===1) return null
  return <>

    <FlexBetween>

      <div>
        <i>Страница {param} </i>
      </div>
        {B}
      <div>
        <i> Страниц {pages}   </i>
      </div>
    </FlexBetween>
  </>;
};
export default React.memo(Component)