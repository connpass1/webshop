import React, { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ChildrenGreed, GridTable, TD, TF, TH } from "../../components/Elements/Table";
import { OrderModel } from "../../models/OrderModel";

const Greed = styled(GridTable)`
  grid-template-columns: minmax(max-content, 40px) minmax(max-content, 240px) minmax(max-content, 70px) minmax(max-content, 60px) minmax(
      max-content,
      60px
    );
`;
const Component: FunctionComponent<{ data: OrderModel[] }> = ({ data }) => {
  const [orders, setOrders] = useState<OrderModel[] | undefined>([]);
  useEffect(() => {
    function f(d: OrderModel[]) {
      try {
        const arr: OrderModel[] = [];
        for (let x in d) {
          let o = new OrderModel(d[x]);
          arr.push(o);
        }
        return arr;
      } catch (e) {
        return undefined;
      }
    }

    setOrders(f(data));
  }, [data]);
  if (!orders) return <>загрузка....</>;
  if (orders.length === 0)
    return (
      <>
        <p> У вас нет активных заказов </p>
      </>
    );
  return (
    <Greed>
      <TH> N</TH>
      <TH> наименоваеие</TH>
      <TH> кол-во</TH>
      <TH> цена</TH>
      <TH>сумма</TH>

      {orders.map((order) => (
        <ChildrenGreed key={order.id}>
          {order.orderItems.map((oi, n) => (
            <ChildrenGreed key={oi.id}>
              <TD> {n} </TD>
              <TD>
                <Link to={"/item/" + oi.item.itemDetailId}> {oi.item.name}</Link>
              </TD>
              <TD> {oi.quantity} </TD>
              <TD> {oi.item.price} </TD>
              <TD> {oi.quantity * oi.item.price} </TD>
            </ChildrenGreed>
          ))}
          <TF> </TF>
          <TF>{order.initDate.toLocaleDateString()}</TF>
          <TF> статус: {order.status} </TF>
          <TF> </TF>
          <TF> {order.sum} </TF>
        </ChildrenGreed>
      ))}
    </Greed>
  );
};
export default Component;
