import { log } from "console";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { ItemLink } from "../components/Elements/ItemLink";
import { CheckFetching } from "../components/Fetching";
import { useFetchingId } from "../components/hooks";
import { PathParent } from "../components/PathParent";
import { ICatalog } from "../store/Models";

const Component: FunctionComponent = () => {
  const { status, data } = useFetchingId();
  const catalog = data as ICatalog;

  return (
    <CheckFetching status={status}>
      <h1>{catalog?.name} </h1>
      <ul></ul>
      <PathParent parent={catalog?.parent}></PathParent>{" "}
      <div className="column">
        {catalog?.inner.map((item) => (
          <ItemLink key={item.id} item={item} />
        ))}
      </div>
    </CheckFetching>
  );
};

export default Component;
