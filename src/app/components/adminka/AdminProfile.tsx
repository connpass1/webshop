import React from "react";
import { connect } from "react-redux";
import { ProfileModel } from "../../models/ProfileModel";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import UserInfo from "../Blocks/UserInfo";
import { H1 } from "../Elements/Icon";

const Component: React.FC<any> = (props) => {
  const user = new ProfileModel(props as ProfileModel);

  return (
    <>
      <H1 src="person"> {user.name}</H1>
      <main className="start">
        <UserInfo user={user} />
        <p>{JSON.stringify(user)} </p>
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
