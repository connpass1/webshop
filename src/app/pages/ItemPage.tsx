import React, { FunctionComponent } from "react";
import { useFetchingId } from "../components/hooks";
import { CheckFetching } from "./ErrorPage";

const Component: FunctionComponent = () => {
  const fetch = useFetchingId(`items/XXXX.json`);
  const { status, data } = fetch;
  const items = data as [any];
  return (
    <CheckFetching status={status}>
      <h1>ItemPage </h1>
      <ul>{data && items.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
      <p>{JSON.stringify(items)}</p>
    </CheckFetching>
  );
};

export default Component;
