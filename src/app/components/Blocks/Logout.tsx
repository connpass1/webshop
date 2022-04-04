import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { actionsUser } from "../../store/storeUser";
import { mapFetchUser } from "../../store/helper";
import styled from "styled-components";
import { Spinner } from "../Elements/SvgSpinner";
import { IoIosLogIn, IoMdCreate } from "react-icons/io";
import { Button, ButtonSecondary } from "../Elements/Button";
import { Column, FlexEnd, Input } from "../Elements/Styled";

type Props = ReturnType<typeof mapFetchUser> & typeof actionsUser;

const Component: FunctionComponent<Props> = (props) => {
  if (props.customer.id)
    return (
      <Button onClick={props.logoutUserRequest} alignSelf="flex-end">
        Выход <IoIosLogIn />
      </Button>
    );
  return null;
};

const connectedComponent = connect(mapFetchUser, actionsUser)(Component);
export default connectedComponent;
