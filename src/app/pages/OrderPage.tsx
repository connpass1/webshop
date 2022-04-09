import React, { FunctionComponent } from "react";
import { IItem } from "../store/Models";
import { Icon } from "../components/Elements/Icon";



const Component: FunctionComponent<{ data :IItem;}> = ({ data }) => {
  return (
  <>
      <h1><Icon src={"order"}/>Заказы</h1>

      {"Заказ"+JSON.stringify(data)}
   </>
  );
};

export default  Component;
