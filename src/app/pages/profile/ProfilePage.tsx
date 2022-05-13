import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Logout from "../../components/Blocks/Logout";
import UserInfo from "../../components/Blocks/UserInfo";
import { ButtonSecondary } from "../../components/Elements/Button";
import { H1 } from "../../components/Elements/Icon";
import { MainStart } from "../../components/Elements/Styled";
import { UserModel } from "../../models/UserModel";
import { mapContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import Orders from "./Orders";
import ProfileForm from "./ProfileForm";
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 16px);
  span,
  button {
    flex-grow: 0;
  }
`;

type Props = ReturnType<typeof mapContent> & typeof actionsContent & { customer: UserModel };
const RouterComponent: FunctionComponent<Props> = (props) => {
  useFetchLocation(props.contentRequest);
  const [state, setState] = useState(false);
  const { content } = props;
  const handlerState = () => setState(!state);

  const showOrders = state && content?.id;

  return (
    <>
      <H1 src={"person"}>Личный кабинет</H1>
      <MainStart>
        <Div>
          <span>
            Вы вошли как <em>{content?.name}</em>
          </span>
          <Logout />
        </Div>
        {content?.id && <ButtonSecondary onClick={handlerState}>Контактные данные </ButtonSecondary>}
        <div>{!showOrders && <ProfileForm {...props} />}</div>
        {showOrders && <UserInfo user={content} />}
        {showOrders && <>{content?.orders && <Orders data={content.orders} />}</>}
      </MainStart>
    </>
  );
};
const connected1 = connect(mapContent, actionsContent)(RouterComponent);
export default connected1;
