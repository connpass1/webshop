import React from "react";
import { FunctionComponent } from "react";
import { useFetchingId } from "./hooks";
export const CheckFetching: FunctionComponent<{ status: number }> = ({ status, children }) => {
  if (status > 200)
    return (
      <>
        <h1>Error load data </h1>
        <h2>{status}</h2>
      </>
    );
  if (status === 200) return <>{children}</>;
  return <></>;
};
export interface ISetData {
  handleData(data: any): void;
}
