import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Logout from "../../components/Blocks/Logout";
import UserInfo from "../../components/Blocks/UserInfo";
import { ButtonSecondary } from "../../components/Elements/Button";
import { H1 } from "../../components/Elements/Icon";
import { UserModel } from "../../models/UserModel";
import { mapContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import Orders from "./Orders";
import ProfileForm from "./ProfileForm";

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
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
  return (
    <>
      <H1 src={"person"}>Личный кабинет</H1>
      <main className={"start"}>
        <Div>
          <span>
            Вы вошли как <em>{content?.name}</em>
          </span>
          <ButtonSecondary onClick={handlerState}>Редактировать </ButtonSecondary>
          <Logout />
        </Div>

        {state ? (
          <ProfileForm {...props} />
        ) : (
          <>
            {content && <UserInfo user={content} />}
            {content?.orders && <Orders data={content.orders} />}
          </>
        )}
      </main>
    </>
  );
};
const connected1 = connect(mapContent, actionsContent)(RouterComponent);
export default connected1;
