import React from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { footerLinks, footerMessage } from "../data";
import { FlexAround } from "./Elements/Styled";
import { ISmall } from "./Wrapper";

const Component: FunctionComponent<ISmall> = ({ small }) => {
  return (
    <footer>
      <FlexAround>
        {footerLinks.map((l, key) => (
          <Link key={`f${key}l`} to={l.link}>
            {l.txt}
          </Link>
        ))}
      </FlexAround>
      <FlexAround>{footerMessage + " small " + small}</FlexAround>
    </footer>
  );
};
export default Component;
