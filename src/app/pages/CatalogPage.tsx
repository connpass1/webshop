import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Breadcrumbs } from "../components/Blocks/Breadcrumbs";
import { CatalogLink } from "../components/Elements/ItemLink";
import ItemBlock from "../components/Blocks/ItemBlock";
import { ICatalog } from "../models/IFases";
import { Icon } from "../components/Elements/Icon";
import { theme } from "../components/GlobalStyles";
import classNames from "classnames";

const Styled = styled.div` 
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, auto));
  flex-flow: row wrap;
  margin: 12px 0; 
  justify-self: center;
  align-content: center;
  justify-content: center;
  color: ${theme.color.secondary};
  a{  font-size:1rem;text-decoration: none;font-weight: 400;;} 
`;

const Gr = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 12px 0; 
`;

const Catalog: FunctionComponent<{ catalog: ICatalog }> = ({ catalog }) => {
  return (
    <> <Breadcrumbs parent={catalog.parent} />
      <h1><Icon src={catalog.icon} /> {catalog.name}</h1>
      <Styled>
        {catalog.childrenCategory?.map((cat) =>
          <Gr key={cat.id}>
            <CatalogLink key={cat.id} item={cat} className={classNames({ "root": cat.childrenCategory?.length > 0 })} />
            {cat.childrenCategory?.map((inner) =>
              <CatalogLink key={inner.id} item={inner} />)}
          </Gr>)}
      </Styled>
      {catalog.items?.length > 0 && <ItemBlock items={catalog.items} />}
    </>
  );
};
export default Catalog;
