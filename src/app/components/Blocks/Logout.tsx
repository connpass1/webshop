import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { actionsUser } from "../../store/storeUser";
import { mapFetchUser } from "../../store/helper";
import { Button } from "../Elements/Button";
import { Icon } from "../Elements/Icon";

type Props = ReturnType<typeof mapFetchUser> & typeof actionsUser;
const Component: FunctionComponent<Props> = (props) => {
  const handler = () => {
    if (props.customer.id) {
      props.logoutUserRequest(props.customer.id);
    }
  };
  if (props.customer)
    return (
      <Button onClick={handler} alignSelf="flex-end">
        Выход <Icon src={"exit"} />
      </Button>
    );
  return null;
};
const connectedComponent = connect(mapFetchUser, actionsUser)(Component);
export default connectedComponent;
