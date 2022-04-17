import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BackToCatalog, ButtonSecondary, CheckBox } from "../components/Elements/Button";
import { FlexBetween, FlexEnd, Table } from "../components/Elements/Styled";
import { compare, mapCart, mapCustomer } from "../store/helper";
import { actionsCart } from "../store/storeCart";
import styled from "styled-components";
import { IItem } from "../models/IFases";
import LoginPage from "../routers/LoginFilter";
import { Icon } from "../components/Elements/Icon";
import { theme } from "../components/GlobalStyles";

type Props = ReturnType<typeof mapCart> & typeof actionsCart;
const TD = styled.td`
  text-align: center;
  color: ${theme.color.secondary};;
  svg {
    cursor: pointer;
  }
`;
const TH = styled.th`
  text-align: center;
  svg {
    cursor: pointer;
  }
`;
type PropsOrder = ReturnType<typeof mapCustomer> & {
  disabled: boolean;
  handler: any;
  items: IItem[];
};
const ButtonOrder: React.FC<PropsOrder> = (props) => {
  const [state, setState] = useState(false);
  const handler = () => {
    if (!state) setState(true);
    else if (props.id) {
      const arr = props.items.filter((it) => it.checked);
      const arr1 = [];
      for (const element of arr) {
        arr1.push({ id: element.id, quantity: element.quantity });
      }
      const order = { userId: props.id, items: arr1 };
      props.handler(order);
    }
  };
  return (
    <>
      {state ? (
        <LoginPage>
          <ButtonSecondary disabled={props.disabled} onClick={handler}>
            подтвердиить заказ
          </ButtonSecondary>
        </LoginPage>
      ) : (
        <ButtonSecondary disabled={props.disabled} onClick={handler}>
          заказать
        </ButtonSecondary>
      )}
    </>
  );
};
const Component: React.FC<Props> = (props) => {
  const { cart } = props;
  const [state, setState] = useState<IItem[]>([]);
  const allCheck = useMemo(() => state.find((it) => !it.checked), [state]);
  const oneCheck = useMemo(() => state.find((it) => it.checked), [state]);
  useEffect(() => {
    const arr: IItem[] = [];
    cart.map((it) => {
      return arr.push({ ...it, checked: true });
    });
    arr.sort(compare);
    setState(arr);
    return;
  }, [cart]);
  const handlerAll = () => {
    const all = state.find((it) => !it.checked) === undefined;
    state.map((it) => (it.checked = !all));
    setState([...state]);
  };
  const handler = (id: number) => {
    const item = state.find((it) => it.id === id);
    if (item) {
      item.checked = !item.checked;
      setState([...state]);
    }
  };
  if (cart.length === 0)
    return (
      <>
        <h1><Icon src={"cart"} /> Корзина</h1>
        <FlexBetween>
          <i>Корзина пуста</i>
          <BackToCatalog />
        </FlexBetween>
      </>
    );
  const handlerDel = () => {
    if (allCheck === undefined) {
      props.clearCart();
      return;
    }
    const arrDel = state.filter((it) => !it.checked);
    console.log("");
    props.delArrayFromCart(arrDel);
  };
  const disabled = oneCheck === undefined;
  return (
    <><FlexEnd>
      <BackToCatalog /> </FlexEnd>

      <h1><Icon src={"cart"} /> Корзина </h1>

      <Table>
        <tbody>
        <tr>
          <th>icon</th>
          <th>name</th>
          <th>quantity</th>
          <th>price</th>
          <TH>
            <CheckBox id={0} handler={handlerAll} check={allCheck === undefined} />
          </TH>
        </tr>
        {state.map((item) => (
          <tr key={item.id}>
            <td>{item.icon}{item.id} </td>
            <td>
              <Link to={"/item/" + item.itemDetailId}> {item.name}</Link>
            </td>
            <td>{item.quantity} </td>
            <td>{item.price} </td>
            <TD>
              <CheckBox id={item.id} handler={handler} check={item.checked} />
            </TD>
          </tr>
        ))}
        </tbody>
      </Table>

      <FlexBetween>
        <ButtonSecondary onClick={handlerDel} disabled={disabled}>
          {allCheck === undefined ? "очистить корзину" : "удалить из корзины"}
        </ButtonSecondary>
        <ButtonComponent items={state} disabled={disabled} handler={props.makeOrderRequest} />
      </FlexBetween>

    </>
  );
};
const ConnectedComponent = connect(mapCart, actionsCart)(Component);
const ButtonComponent = connect(mapCustomer)(ButtonOrder);
export default ConnectedComponent;
