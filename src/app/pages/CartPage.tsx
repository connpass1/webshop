import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BackToCatalog, Button } from "../components/Elements/Button";
import { H1, Icon } from "../components/Elements/Icon";
import { FlexEvenly, Row } from "../components/Elements/Styled";
import { ChildrenGreed, GridTable, TD, TH, TI } from "../components/Elements/Table";
import { IItem } from "../models/IFaces";
import LoginFilter from "../routers/LoginFilter";
import { compare, mapCart, mapCustomer } from "../store/helper";
import { actionsCart } from "../store/storeCart";

type Props = ReturnType<typeof mapCart> & typeof actionsCart;
const Table = styled(GridTable)`
  grid-template-columns: 40px 3fr 1fr min-content 40px;
  svg {
    cursor: pointer;
  }
`;
const Gr = styled(GridTable)`
  display: column;
  justify-self: center;
  max-width: 400px;
  b {
    font-size: 1.5em;
  }
  button {
    flex-grow: 1;
  }
`;
type PropsOrder = ReturnType<typeof mapCustomer> & {
  disabled: boolean;
  handler: any;
  items: IItem[];
  state: boolean;
  stateHandler: any;
};
const ButtonOrder: React.FC<PropsOrder> = (props) => {
  const handler = () => {
    if (!props.state) props.stateHandler();
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
      {props.state ? (
        <>
          <LoginFilter>
            <Gr>
              <div>
                <b>сделать заказ</b>{" "}
              </div>
              <Row>
                <Button onClick={props.stateHandler}> отмена </Button>
                <Button onClick={handler}>подтвердить</Button>
              </Row>
            </Gr>
          </LoginFilter>
        </>
      ) : (
        <Button disabled={props.disabled} onClick={handler}>
          заказать
        </Button>
      )}
    </>
  );
};
const Component: React.FC<Props> = (props) => {
  const { cart } = props;
  const [state, setState] = useState<IItem[]>([]);
  const [login, setLogin] = useState(false);
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
  const loginHandler = () => {
    setLogin(!login);
  };
  if (cart.length === 0)
    return (
      <>
        <H1 src={"cart"}> Корзина</H1>
        <main className={"between"}>
          <FlexEvenly>
            <i>Корзина пуста</i>
            <BackToCatalog />
          </FlexEvenly>
          <div />
          <div />
        </main>
      </>
    );
  const handlerDel = () => {
    if (allCheck === undefined) {
      props.clearCart();
      return;
    }
    const arrDel = state.filter((it) => !it.checked);
    props.delArrayFromCart(arrDel);
  };

  const disabled = oneCheck === undefined;
  return (
    <>
      <H1 src={"cart"}> Корзина </H1>
      <main>
        {!login && (
          <Table>
            <TH>N</TH>
            <TH>назание</TH>
            <TH>количество</TH>
            <TH>цена</TH>
            <TH onClick={handlerAll}>
              <Icon src={!allCheck ? "ok" : "rect"} />
            </TH>
            {state.map((item, num) => (
              <ChildrenGreed key={item.id}>
                <TD> {num + 1}</TD>
                <TD>
                  <Link to={"/item/" + item.id}>
                    <Icon src={item.icon} /> {item.name}
                  </Link>
                </TD>
                <TD>
                  <span>{item.quantity} </span>
                </TD>
                <TD>{item.price} </TD>
                <TI onClick={() => handler(item.id)}>
                  <Icon src={item.checked ? "ok" : "rect"} />
                </TI>
              </ChildrenGreed>
            ))}
          </Table>
        )}
        <FlexEvenly>
          {!login && (
            <Button onClick={handlerDel} disabled={disabled}>
              {allCheck === undefined ? "очистить корзину" : "удалить из корзины"}
            </Button>
          )}
          <ButtonComponent state={login} stateHandler={loginHandler} items={state} disabled={disabled} handler={props.makeOrderRequest} />
        </FlexEvenly>
      </main>
    </>
  );
};
const ConnectedComponent = connect(mapCart, actionsCart)(Component);
const ButtonComponent = connect(mapCustomer)(ButtonOrder);
export default ConnectedComponent;
