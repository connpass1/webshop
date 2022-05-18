import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { mapFetchUser } from "../../store/helper";
import { actionsUser } from "../../store/storeUser";
import { Icon } from "../Elements/Icon";
import { Button } from "../Elements/Styled";

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
