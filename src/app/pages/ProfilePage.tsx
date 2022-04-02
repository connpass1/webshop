import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../components/Elements/Button";
import { Login } from "../components/Blocks/Login";
import { isEqual, mapCustomer, mapFetchUser } from "../store/helper";
import { ICustomer } from "../store/Models";
import { actionsUser } from "../store/storeUser";
type Props = ReturnType<typeof mapCustomer>;
const Component: React.FC<ICustomer> = (customer) => {
  return (
    <>
      <h1>Личный кабинет</h1>
      <div className="column">
        <Login />
      </div>
    </>
  );
};
const connectedComponent = connect(mapCustomer)(Component);

export default connectedComponent;
