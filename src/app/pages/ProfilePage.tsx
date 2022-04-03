import React from "react";
import { connect } from "react-redux";
import { Login } from "../components/Blocks/Login";
import { Column } from "../components/Elements/Styled";
import { mapCustomer } from "../store/helper";
import { ICustomer } from "../store/Models";
type Props = ReturnType<typeof mapCustomer>;
const Component: React.FC<ICustomer> = (customer) => {
  return (
    <>
      <h1>Личный кабинет</h1>
      <Column>
        <Login />
      </Column>
    </>
  );
};
const connectedComponent = connect(mapCustomer)(Component);

export default connectedComponent;
