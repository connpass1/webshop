import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { getErrorStatus } from "../store/helper";
import { ICatalog } from "../store/Models";
import { CatalogLink } from "./Elements/ItemLink";
import { SERVERNAME } from "./hooks";
import { Link } from "react-router-dom";

export const Styled = styled.figure`

 
  figcaption {
   // background-color: var(--primary-color);
    color:  var(--primary-color);
    padding: 8px;
    
    @media (max-width: 720px) {
      padding: 0;
    }
  }

   
  border: 1px solid var(--primary-color);
  width: 100%;

  li {
    border-bottom: var(--border);
    border-top: var(--border);
    padding: 0.25rem 0.25em;
  }

  a {
    color: var(--primary-color);
  }
`;

const Component: FunctionComponent<{  closeNav: any  }> = ({closeNav}) => {
  const [data, setData] = useState<ICatalog>();
  const [status, setStatus] = useState(0);
  useEffect(() => {
    axios
      .get(SERVERNAME + `/catalog/0`)
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
        <figcaption><Link to="/catalog/0" onClick={closeNav}>Каталог</Link>

        </figcaption>
        {data.childrenCategory && (
          <ul>
            {data.childrenCategory.map((item) => (
              <li key={item.id}>
                <CatalogLink  item={item} onClick={closeNav} />
              </li>
            ))}
          </ul>
        )}
      </Styled>
    );

  return <>{status} </>;
};
export default Component;
