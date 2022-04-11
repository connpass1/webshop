import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { footerLinks, footerMessage } from "../data";
import { FlexAround } from "./Elements/Styled";

const Component: FunctionComponent = () => {
  return (
    <footer>
      <FlexAround>
        {footerLinks.map((l, key) => (
          <Link key={`f${key}l`} to={l.link}>
            {l.txt}
          </Link>
        ))}
      </FlexAround>
      <FlexAround>{footerMessage}</FlexAround>
    </footer>
  );
};
export default Component;
