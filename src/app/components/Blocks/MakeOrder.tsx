import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";

import { getErrorStatus, mapCustomer } from "../../store/helper";
import { IItem } from "../../store/Models";
import { ButtonSecondary } from "../Elements/Button";
import { FlexEnd } from "../Elements/Styled";
import { CheckFetching } from "../Fetching";
import { Login } from "./Login";
type Props = ReturnType<typeof mapCustomer> & {
  disabled: boolean;
  order: IItem[];
};

const Component: React.FC<Props> = (props) => {
  const [data, setData] = useState(undefined);
  const [status, setStatus] = useState(0);
  const handler = () => {
    console.log(props.id);
    const arr = props.order.filter((it) => it.checked === true);
    const order: { id: number; quantity: number }[] = [];
    arr.map((it) => order.push({ id: it.id, quantity: it.quantity }));

    axios
      .post("http://localhost:8080/order/" + props.id, order)
      .then((res) => {
        setData(res.data);
        setStatus(200);
        console.log(data);
      })
      .catch((e) => {
        setData(undefined);
        setStatus(getErrorStatus(e));
        console.log(e);
      });
  };
  if (status == 0)
    return (
      <FlexEnd>
        <ButtonSecondary disabled={props.disabled} onClick={handler}>
          заказать
          {props.id}
        </ButtonSecondary>
      </FlexEnd>
    );
  return <CheckFetching status={status}>{JSON.stringify(data)}</CheckFetching>;
};
const ConnectedComponent = connect(mapCustomer)(Component);

export default ConnectedComponent;
