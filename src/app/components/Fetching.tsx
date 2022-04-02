import React from "react";
import { FunctionComponent } from "react";

export const CheckFetching: FunctionComponent<{ status: number }> = ({ status, children }) => {
  if (status > 200)
    return (
      <>
        <h1>Error load data </h1>
        <h2>{status}</h2>
      </>
    );
  if (status === 200) return <>{children}</>;
  return <div className="loader">Loading...</div>;
};
export interface ISetData {
  handleData(data: any): void;
}
