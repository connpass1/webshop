import React from "react";
import { ProfileModel } from "../../models/ProfileModel";
import UserInfo from "../Blocks/UserInfo";
import { H1 } from "../Elements/Icon";

const Component: React.FC<{ content?: any }> = ({ content }) => {
  const user = new ProfileModel(content as ProfileModel);

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

export default Component;
