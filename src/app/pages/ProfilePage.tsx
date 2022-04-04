import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Login } from "../components/Blocks/Login";
import Logout from "../components/Blocks/Logout";
import { Column, FlexEnd, Row } from "../components/Elements/Styled";
import { mapCustomer } from "../store/helper";
import { ICustomer } from "../store/Models";
type Props = ReturnType<typeof mapCustomer>;
const Component: React.FC = (customer) => {
  return (
    <>
      <FlexEnd>
        <Logout />
      </FlexEnd>
      <h1>Личный кабинет</h1>

      <Login>
        <p>
          <Link to="/order"> Заказы</Link>
        </p>
      </Login>
    </>
  );
};

export default Component;
