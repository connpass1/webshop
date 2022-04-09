import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "../components/Elements/Icon";
const Component: FunctionComponent = () => {
  const location = useParams();
  const id = (location as any).id;

  return (
    <>
      <h1><Icon src={"flash"}/>ErrorPage </h1>
      <h2>{id}  <Icon src={"cart"}/></h2>ggg    <Icon src={"chat"}/><Icon src={"ok"}/>


      <Icon src={"cart"}/>
    </>
  );
};
export default Component;
