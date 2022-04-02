import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { mapCart } from "../store/helper";
import { cartReducer } from "../store/storeCart";
import { IOrder } from "../store/Models";
type Props = ReturnType<typeof cartReducer>;
const Component: FunctionComponent<Props> = ({ props }) => {
  return (
    <>
      <h1>CartPage </h1>
      {JSON.stringify(props)}
    </>
  );
};

const connectedComponent = connect(mapCart)(Component);

export default connectedComponent;
