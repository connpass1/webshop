import React, { FunctionComponent, useEffect, useState } from "react";
import { Icon } from "../components/Elements/Icon";
import { LINK, Table, Tr } from "../components/Elements/Styled";
import { OrderModel } from "../models/OrderModel";

const Component: FunctionComponent<{ data: OrderModel[] }> = ({ data }) => {
  const [orders, setOrders] = useState<OrderModel[] | undefined>([]);
  useEffect(() => {
      function f(d: OrderModel[]) {
        try {
          const arr: OrderModel[] = [];
          for (let x in d) {
            let o = new OrderModel(d[x]);
            console.log(o);
            arr.push(o);
          }
          return arr;
        } catch (e) {
          return undefined;
        }
      }

      setOrders(f(data));
    }
    , [data]);
  if (!orders) return <>загрузка....</>;
  if (orders.length === 0) return <>
    <p> У вас нет активных заказов </p>
  </>;
  return (
    <>
      <h1><Icon src={"order"} />Заказы</h1>
      <Table>
        <thead>
        <tr>
          <th colSpan={2}> наименоваеие</th>
          <th> кол-во</th>
          <th colSpan={2}> цена</th>
        </tr>
        </thead>
        {orders.map(order => < tbody key={order.id}>
        {order.orderItems.map(oi => <tr key={oi.id}>
            <td>  {oi.item.icon}  </td>
            <td><LINK to={"/item/" + oi.item.itemDetailId}> {oi.item.name}</LINK></td>
            <td>  {oi.quantity}  </td>
            <td>  {oi.item.price}  </td>
            <td>  {oi.quantity * oi.item.price}  </td>
          </tr>
        )}
        <Tr>
          <td colSpan={5}>
            {order.initDate.toLocaleString()} статус: {order.status}
            сумма {order.sum}
          </td>
        </Tr>
        </tbody>)}
      </Table>
    </>
  );
};
export default Component;
