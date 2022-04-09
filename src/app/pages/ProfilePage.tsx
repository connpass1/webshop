import React from "react";
import { Link } from "react-router-dom";
import Logout from "../components/Blocks/Logout";
import {   FlexEnd } from "../components/Elements/Styled";
import {   IProfile } from "../store/Models";
import { Icon } from "../components/Elements/Icon";

const Component: React.FC<{profile:IProfile}> = ({profile } ) => {
  return (
    <>
      <FlexEnd>
        <Logout />
      </FlexEnd>
      <h1> <Icon src={"person"}/>Личный кабинет</h1>

        <p>
          <Link to="/order"> Заказы</Link>
        </p>

    </>
  );
};

export default Component;
