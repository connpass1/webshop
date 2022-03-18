import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { IEntity } from "../store/Models";
import { getErrorStatus } from "../store/saga";
import { ItemLink } from "./Elements/ItemLink";
const Styled = styled.div`
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
    border: 1px solid var(--primary-color);
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
  const [data, setData] = useState<IEntity[]>([]);
  const [status, setStatus] = useState(0);
  useEffect(() => {
    setData([]);
    axios
      .get(`http://localhost:3000/json/catalog.json`)
      .then((res) => {
        setData(res.data as IEntity[]);
      })
      .catch((e) => {
        console.log(e);
        setStatus(getErrorStatus(e));
      });
  }, []);

  if (data.length > 0)
    return (
      <Styled>
        <figure>
          <figcaption> Каталог</figcaption>
          <ul>
            {data.map((item) => (
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
