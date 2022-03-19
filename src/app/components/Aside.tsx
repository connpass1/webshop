import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { ICatalog } from "../store/Models";
import { getErrorStatus } from "../store/saga";
import { ItemLink } from "./Elements/ItemLink";
const Styled = styled.aside`
  color: #000;
  padding: 4px;
  width: 100%;
  figcaption {
    background-color: var(--primary-color);
    color: white;
    padding: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  figure {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border: 1px sodivlid var(--primary-color);
    width: 100%;
  }

  li {
    border-bottom: var(--border);
    border-top: var(--border);
    padding: 0.25rem 0.25em;
  }
  a {
    color: var(--primary-color);
  }
`;

const Catalog: FunctionComponent = () => {
  const [data, setData] = useState<ICatalog>();
  const [, setStatus] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/json/catalog/0.json`)
      .then((res) => {
        setData(res.data as ICatalog);
      })
      .catch((e) => {
        console.log(e);
        setStatus(getErrorStatus(e));
      });
  }, []);

  if (data)
    return (
      <Styled>
        <figure>
          <figcaption> Каталог</figcaption>
          <ul>
            {data.inner.map((item) => (
              <li key={item.id}>
                <ItemLink item={item} />
              </li>
            ))}
          </ul>
        </figure>
      </Styled>
    );

  return <> </>;
};
export default Catalog;
