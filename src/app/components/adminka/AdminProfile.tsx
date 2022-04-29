import React from "react";
import { connect } from "react-redux";
import { ProfileModel } from "../../models/ProfileModel";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import { Row } from "../Elements/Styled";

const Component: React.FC<any> = (props) => {
  const user = new ProfileModel(props as ProfileModel);

  return (
    <main className={"start"}>
      <Row>
        <div>
          <a href={"mailto:" + user.email}>{user.email}</a>
        </div>
        <div>{user.name}</div>
        <div>{user.address}</div>
        <div>
          <a href={`tel:+${user.phone}`}>+{user.phone}</a>
        </div>
      </Row>
    </main>
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