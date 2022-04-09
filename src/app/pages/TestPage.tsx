import React from "react";
import { connect } from "react-redux";
import { Button } from "../components/Elements/Button";
import { mapCart, mapMessage } from "../store/helper";
import { actionsCart } from "../store/storeCart";
import { actionsMessage } from "../store/storeMessage";
import LoginPage from "./LoginPage";
type Props2 = ReturnType<typeof mapMessage> & typeof actionsMessage;
const Component2: React.FC<Props2> = (props) => {
  const { message, adMessageRequest, status } = props;
  return (
    <>
      {"fetching" + status}
      {message}
      <Button onClick={() => adMessageRequest("props ")} outlined>
        adMessageRequest
      </Button>
      <Button onClick={props.clearMessage} outlined>
        clearMessage
      </Button>
    </>
  );
};
const Connected2 = connect(mapMessage, actionsMessage)(Component2);

type Props = ReturnType<typeof mapCart> & typeof actionsCart;

const Component: React.FC<Props> = (props) => {
  return (
    <>
      <Connected2 />
      <LoginPage />
      <hr />

      <Button onClick={props.clearCart} outlined>
        gggg
      </Button>
    </>
  );
};

const connectedComponent = connect(mapCart, actionsCart)(Component);
export default connectedComponent;
