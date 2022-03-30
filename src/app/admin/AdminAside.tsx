import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { StyledAside } from "../components/Aside";

const Component: FunctionComponent = () => {
  return (
    <StyledAside>
      <figure>
        <figcaption> Админка</figcaption>
        <ul>
          <li>
            <Link to="/admin/catalog"> каталог</Link>
          </li>
          <li>
            <Link to="/admin/items"> товар</Link>
          </li>
          <li>
            <Link to="/admin/pages"> страницы</Link>
          </li>
        </ul>
      </figure>
    </StyledAside>
  );
};
export default Component;
