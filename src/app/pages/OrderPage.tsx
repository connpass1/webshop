import React, { FunctionComponent } from "react";
import { IOrder } from "../store/Models";
import { Icon } from "../components/Elements/Icon";
import { FlexBetween, Table } from "../components/Elements/Styled";

const Component: FunctionComponent<{ data: IOrder[] }> = ({ data }) => {
  return (
    <>
      <h1><Icon src={"order"} />Заказы</h1>
      {data.map(order => <FlexBetween key={order.id}>
        <span>{new Date(order.initDate).toLocaleString()}</span>
        <span>{order.status}</span>
        <Table>
          <thead>
          <tr>
            <th colSpan={2}> наименоваеие</th>
            <th> кол-во</th>
            <th colSpan={2}> цена</th>
          </tr>
          </thead>
          <tbody>
          {order.orderItems.map(oi => <tr key={oi.id}>
            <td>  {oi.item.icon}  </td>
            <td>  {oi.item.name}  </td>
            <td>  {oi.quantity}  </td>
            <td>  {oi.item.price}  </td>
            <td>  {oi.quantity * oi.item.price}  </td>
          </tr>)}</tbody>
        </Table>

      </FlexBetween>)}

    </>
  );
};

export default Component;
