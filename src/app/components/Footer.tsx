import React from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { footerLinks, footerMessage } from "../data";
import { ISmall } from "./Wrapper";
const Styled = styled.footer`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .inner {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Component: FunctionComponent<ISmall> = ({ small }) => {
  return (
    <Styled>
      <div className="inner">
        {footerLinks.map((l, key) => (
          <Link key={`f${key}l`} to={l.link}>
            {l.txt}
          </Link>
        ))}
      </div>
      <div className="inner">{footerMessage + " small " + small}</div>
    </Styled>
  );
};
export default Component;
