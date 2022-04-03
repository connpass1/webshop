import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonSecondary, BackButton } from "../components/Elements/Button";
import { mapCart } from "../store/helper";
import { actionsCart } from "../store/storeCart";

type Props = ReturnType<typeof mapCart> & typeof actionsCart;
const Row = styled.div`
  margin: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
const Table = styled.table`
  margin: 12px 0;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  th,
  td {
    border: 1px solid;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: var(--grey-color-light);
  }
  tr:hover {
    background-color: var(--secondary-color-light);
  }
  .icon {
    width: "40px";
    background-repeat: no-repeat;
    margin-left: auto;
    margin-right: auto;
  }
  .price {
    width: "80px";
  }
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: var(--secondary-color);
    color: white;
  }
`;
const Component: React.FC<Props> = (props) => {
  const { cart } = props;

  if (cart.length === 0)
    return (
      <Row>
        <i>Корзина пуста</i>
        <BackButton />
      </Row>
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
            <tr key={item.id}>
              <td className="icon">{item.icon} </td>
              <td>
                <Link to={"/item/" + item.id}> {item.name}</Link>
              </td>
              <td>{item.quantity} </td>
              <td className="price">{item.price} </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <ButtonSecondary onClick={() => console.log("оформить заказ")}>оформить заказ</ButtonSecondary>
      </Row>
    </>
  );
};
const ConnectedComponent = connect(mapCart, actionsCart)(Component);

const ComponentExport = () => (
  <>
    <h1>Заказы</h1>
    <ConnectedComponent />
  </>
);

export default ComponentExport;
