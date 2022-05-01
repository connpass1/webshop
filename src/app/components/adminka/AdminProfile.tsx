import React, { useMemo } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ProfileModel } from "../../models/ProfileModel";
import { mapContent, phone, PropsContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import UserInfo from "../Blocks/UserInfo";
import { H1 } from "../Elements/Icon";
import { theme } from "../GlobalStyles";
const Styled = styled.div`
  display: grid;
  gap: 4px;
  width: 100%;
  padding-left: 12px;
  a {
    color: ${theme.color.secondary};
  }
`;
const Component: React.FC<any> = (props) => {
  const user = new ProfileModel(props as ProfileModel);
  const phoneNumber = useMemo(() => phone(props.phone), [props]);
  return (
    <>
      <H1 src="person"> {user.name}</H1>
      <main className="start">
        <UserInfo user={user} />
      </main>
    </>
  );
};
const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  if (props.status < 200) return null;
  if (!props.content) return null;

  return <Component {...props.content} />;
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
