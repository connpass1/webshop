import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Breadcrumbs } from "../components/Elements/Breadcrumbs";
import { CatalogLink } from "../components/Elements/ItemLink";
import ItemBlock from "../components/Blocks/ItemBlock";
import { ICatalog } from "../models/IFases";
import { Icon } from "../components/Elements/Icon";
const Styled = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 12px 0;
`;
const Catalog: FunctionComponent<{ catalog: ICatalog }> = ({ catalog }) => {
  return (
    <> <Breadcrumbs parent={catalog.parent} />
      <header><Icon src={catalog.icon} />
        <h1> {catalog.name}</h1></header>
      <Styled>
        {catalog.childrenCategory?.map((cat) => (
          <CatalogLink key={cat.id} item={cat} />
        ))}
      </Styled>
      {catalog.items?.length > 0 && <ItemBlock items={catalog.items} />}
    </>
  );
};
export default Catalog;
