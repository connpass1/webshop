import React, { FunctionComponent } from "react";
import { CheckFetching } from "../components/Fetching";
import { useFetchingId } from "../components/hooks";
import { IItem } from "../store/Models";

const Component: FunctionComponent = () => {
  const { status, data } = useFetchingId();
  const item = data as IItem;
  return <CheckFetching status={status}>{item && JSON.stringify(item)}</CheckFetching>;
};

export default Component;
