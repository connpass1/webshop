import React from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";
const Styled = styled.div`
  color: #000;
  padding: 4px;
  width: 100%;
  figcaption {
    background-color: var(--main-bg-color);
    color: white;
    padding: 8px;
    -webkit-border-top-left-radius: 8px;
    -webkit-border-top-right-radius: 8px;
    -moz-border-radius-topleft: 8px;
    -moz-border-radius-topright: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  figure {
    -webkit-border-top-left-radius: 8px;
    -webkit-border-top-right-radius: 8px;
    -moz-border-radius-topleft: 8px;
    -moz-border-radius-topright: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border: 1px solid var(--main-bg-color);
    width: 100%;
  }
  ul {
  }
`;

const Catalog: FunctionComponent = () => {
  return (
    <Styled>
      <figure>
        <figcaption>Catalog </figcaption>
        <ul>
          <li>
            <a href="fff">rrr</a>
          </li>
          <li>
            <a href="fff">rrr</a>
          </li>
          <li>
            <a href="fff">rrr</a>
          </li>
        </ul>
      </figure>
    </Styled>
  );
};
export default Catalog;
