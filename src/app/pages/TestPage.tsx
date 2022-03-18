import React from "react";
import { FunctionComponent } from "react";
import Icon from "../components/Elements/Icon";
import { Customer } from "./customer";

const Component: FunctionComponent = () => {
  return (
    <>
      <Icon>
        <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
      </Icon>
      <Customer caption={"Customer"} />
    </>
  );
};
export default Component;
