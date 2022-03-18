import React, { FunctionComponent } from "react";
import { ItemLink } from "../components/Elements/ItemLink";
import { CheckFetching } from "../components/Fetching";
import { useFetchingId } from "../components/hooks";

const Component: FunctionComponent = () => {
  const { status, data } = useFetchingId();
  const item = data as any;
  return (
    <CheckFetching status={status}>
      <h1>ItemPage </h1>
      <p>{JSON.stringify(item)}</p> <ItemLink item={item} />
    </CheckFetching>
  );
};

export default Component;
