import React, { FunctionComponent } from "react";
import { ItemLink } from "../components/Elements/ItemLink";
import { CheckFetching } from "../components/Fetching";
import { useFetchingId } from "../components/hooks";

import { ICatalog } from "../store/Models";
import { PathHeader } from "../components/PathHeader";

const Component: FunctionComponent = () => {
  const { status, data } = useFetchingId();
  const catalog = data as ICatalog;

  return (
    <CheckFetching status={status}>
      <PathHeader item={catalog} />
      <div className="column">
        {catalog?.inner.map((item) => (
          <ItemLink key={item.id} item={item} />
        ))}
      </div>
    </CheckFetching>
  );
};

export default Component;
