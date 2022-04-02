import axios from "axios";
import React, { FunctionComponent, Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { getErrorStatus } from "../store/helper";
import { ICatalog } from "../store/Models";
import { CatalogLink } from "./Elements/ItemLink";
export const StyledAside = styled.aside`
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

const Component: FunctionComponent = () => {
  const [data, setData] = useState<ICatalog>();
  const [status, setStatus] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/catalog/0`)
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
      <StyledAside>
        <figure>
          <figcaption> Каталог</figcaption>
          {data.childrenCategory && (
            <ul>
              {data.childrenCategory.map((item) => (
                <li key={item.id}>
                  <CatalogLink item={item} />
                </li>
              ))}
            </ul>
          )}
        </figure>
      </StyledAside>
    );

  return <>{status} </>;
};

const AdminAside = React.lazy(() => import("../admin/AdminAside"));
const Component1: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/admin">
        <Suspense fallback={<div>Загрузка ...</div>}>
          <AdminAside />
        </Suspense>
      </Route>
      <Route>
        <Component />
      </Route>
    </Switch>
  );
};
export default Component1;
