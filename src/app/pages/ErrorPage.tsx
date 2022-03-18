import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

const Component: FunctionComponent = () => {
  const location = useParams();
  const id = (location as any).id;
  console.log("error" + id);
  return (
    <>
      <h1>ErrorPage </h1>
      <h2>{id}</h2>
    </>
  );
};
export default Component;
