import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { CatalogLink } from "../components/Elements/ItemLink";

import { CheckFetching } from "../components/Fetching";
import { useFetchingId } from "../components/hooks";
import { ICatalog } from "../store/Models";
import { Parent } from "../components/Elements/Parent";
import ItemBlock from "../components/Blocks/ItemBlock";
const Styled = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 12px 0;
  padding-bottom: 12px;
  border-bottom: var(--border);
`;
const Component: FunctionComponent = () => {
  const { status, data } = useFetchingId();
  const catalog = data as ICatalog;

  if (!data) return null;
  return (
    <CheckFetching status={status}>
      <h1>{catalog.name}</h1>
      <Parent {...catalog.parent} />
      <Styled>
        {catalog.childrenCategory?.map((cat) => (
          <CatalogLink key={cat.id} item={cat}>
            {cat.name}
          </CatalogLink>
        ))}
      </Styled>
      <ItemBlock categoryId={catalog.id} />
    </CheckFetching>
  );
};

export default Component;
