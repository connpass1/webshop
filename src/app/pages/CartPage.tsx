import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonSecondary, BackButton, RedirectButton } from "../components/Elements/Button";
import { RowSpaceBetween, Table } from "../components/Elements/Styled";
import { mapCart } from "../store/helper";
import { actionsCart } from "../store/storeCart";

type Props = ReturnType<typeof mapCart> & typeof actionsCart;

const Component: React.FC<Props> = (props) => {
  const { cart } = props;
  const [redirect, seRedirect] = useState(0);

  if (redirect > 0) return <Redirect to={"/item/" + redirect} />;
  if (cart.length === 0)
    return (
      <RowSpaceBetween>
        <i>Корзина пуста</i>
        <BackButton />
      </RowSpaceBetween>
    );

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th>icon</th>
            <th>name</th>
            <th>quantity</th>
            <th>price</th>
          </tr>
          {cart.map((item) => (
            <tr key={item.id} style={{ cursor: "pointer" }} onClick={() => seRedirect(item.id)}>
              <td className="icon">
                <Link to={"/item/" + item.id}>{item.icon}</Link>
              </td>
              <td>
                <Link to={"/item/" + item.id}> {item.name}</Link>
              </td>
              <td>
                <Link to={"/item/" + item.id}>{item.quantity} </Link>
              </td>
              <td className="price">
                <Link to={"/item/" + item.id}>{item.price} </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <RowSpaceBetween>
        <ButtonSecondary onClick={props.clearCart}>очистить козину</ButtonSecondary>
        <RedirectButton to="/order">оформить заказ</RedirectButton>
        <BackButton />
      </RowSpaceBetween>
    </>
  );
};
const ConnectedComponent = connect(mapCart, actionsCart)(Component);

const ComponentExport = () => (
  <>
    <h1>Корзина</h1>
    <ConnectedComponent />
  </>
);

export default ComponentExport;
