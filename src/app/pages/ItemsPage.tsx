import React, { FunctionComponent } from "react";
import { ItemLink } from "../components/Elements/ItemLink";
import { CheckFetching } from "../components/Fetching";
import { useFetchingId } from "../components/hooks";

const Component: FunctionComponent = () => {
  const { status, data } = useFetchingId();
  const items = data as any[];
  return (
    <CheckFetching status={status}>
      <h1>ItemPage </h1>
      <ul>
        {data &&
          items.map((item) => (
            <li key={item.id}>
              <ItemLink item={item} />
            </li>
          ))}
      </ul>
      <p>{JSON.stringify(items)}</p>
    </CheckFetching>
  );
};

export default Component;
