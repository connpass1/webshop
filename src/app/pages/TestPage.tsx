import React from "react";

import { connect } from "react-redux";
import { Button } from "../components/Elements/Button";

import { Login } from "../components/Blocks/Login";

import { mapCart } from "../store/helper";
import { actionsCart } from "../store/storeCart";

type Props = ReturnType<typeof mapCart> & typeof actionsCart;

const Component: React.FC<Props> = (props) => {
  return (
    <>
      <Login />
      <hr />
      {JSON.stringify(props.items)}
      <Button onClick={null} outlined>
        gggg
      </Button>
    </>
  );
};

const connectedComponent = connect(mapCart, actionsCart)(Component);
export default connectedComponent;
