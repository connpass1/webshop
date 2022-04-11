import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Breadcrumbs } from "../components/Elements/Breadcrumbs";
import { CatalogLink } from "../components/Elements/ItemLink";
import ItemBlock from "../components/Blocks/ItemBlock";
import { ICatalog } from "../store/Models";
import { Icon } from "../components/Elements/Icon";
import { theme } from "../components/GlobalStyles";

const Styled = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 12px 0;
  padding-bottom: 12px;
  
`;

const Catalog: FunctionComponent<{ catalog:ICatalog} > = ({ catalog }) => {

  return (
    <> <Breadcrumbs parent={catalog.parent} />
      <h1><Icon src={catalog.icon}/>{catalog.name}</h1>
      <Styled>
        {catalog.childrenCategory?.map((cat) => (
          <CatalogLink key={cat.id}   item={cat}/>
        ))}
      </Styled>
      {catalog.items?.length > 0 && <ItemBlock items={catalog.items} />}
    </>
  );
};

export default Catalog

