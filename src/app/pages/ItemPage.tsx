import React, { FunctionComponent } from "react";
import { CheckFetching } from "../components/Fetching";
import { useFetchingId } from "../components/hooks";
import { PathHeader } from "../components/PathHeader";
import { IItem } from "../store/Models";

const Component: FunctionComponent = () => {
  const { status, data } = useFetchingId();
  const item = data as IItem;
  console.log(data);

  return (
    <CheckFetching status={status}>
      <PathHeader item={item} />
      {JSON.stringify(data)}
    </CheckFetching>
  );
};

export default Component;
