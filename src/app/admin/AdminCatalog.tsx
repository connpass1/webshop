import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { CatalogLink } from "../components/Elements/ItemLink";
import ItemPreview from "../components/Elements/ItemPreview";
import { CheckFetching } from "../components/Fetching";
import { useFetchingId } from "../components/hooks";
import { ICatalog } from "../store/Models";
import { Parent } from "../components/Elements/Parent";
const Block = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 200px);

  margin: auto;
  justify-content: center;
`;

const Component: FunctionComponent = () => {
  const { status, data } = useFetchingId();
  const catalogArr = data as [ICatalog];
  if (!data) return null;
  return (
    <CheckFetching status={status}>
      {catalogArr.map((catalog) => (
        <div key={catalog.id}>
          <h1>{catalog.name}</h1>
          <Parent {...catalog.parent} />
          {catalog.childrenCategory?.map((cat) => (
            <CatalogLink key={cat.id} item={cat}>
              {cat.name}
            </CatalogLink>
          ))}
        </div>
      ))}
    </CheckFetching>
  );
};

export default Component;
