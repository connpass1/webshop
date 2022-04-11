import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { mapCart } from "../../store/helper";
import { IItem } from "../../models/IFases";
import { actionsCart } from "../../store/storeCart";
import { ButtonSecondary, RectButton } from "../Elements/Button";
import { FlexCenter } from "../Elements/Styled";
import styled from "styled-components";
import { theme } from "../GlobalStyles";

type Props = ReturnType<typeof mapCart> &
  typeof actionsCart & {
  item: IItem;
};
const Form = styled.form`
  grid-area: add;
  grid-template-areas: 
         " mes mes mes mes" 
          " .  input input ." 
         " del   del    add    add";
  justify-content: center;
  grid-template-columns:  min-content  1fr 1fr   min-content;
  grid-template-rows:   min-content 2fr  1fr;
  gap: 4px;
  display: grid;
  border-radius: 0 0 8px 8px !important;
  background-color: ${theme.color.primaryLight};
  border: none;

  .input {
    grid-area: input
  }

  .add {
    grid-area: add;
    justify-self: right;
  }

  .del {
    grid-area: del
  }

  em {
    grid-area: mes;
    color: ${theme.color.primary};
    padding: 12px;
  }

  input {
    margin: 0;
    width: 4em;
    margin: 12px;
  }
;
  border-radius: 8px;
  border: ${theme.border};
  justify-content: center;
`;
const CartBlock: React.FC<Props> = (prop) => {
  const { item, adToCart, cart } = prop;
  const itemInCart = useMemo(() => cart.find((it) => item.id === it.id), [prop]);
  const [state, setState] = useState(1);
  useEffect(() => {
    if (itemInCart) setState(itemInCart.quantity + 1);
    else setState(1);
  }, [itemInCart]);
  const handelAdd = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const item1 = { ...item };
    item1.quantity = state;
    adToCart(item1);
  };
  const handePlus = (event: { preventDefault: () => void; }) => {
    setState(state + 1);
  };
  const handeMinus = (event: { preventDefault: () => void; }) => {
    if (state > 0)
      setState(state - 1);
  };
  const handelDel = () => {
    const item1 = { ...item };
    item1.quantity = 0;
    adToCart(item1);
    setState(0);
  };
  const handle = (v: { target: { value: string; }; }) => {
    let x = parseInt(v.target.value);
    x = isNaN(x) ? 1 : x;
    setState(x);
  };
  return (
    <Form onSubmit={handelAdd}>
      < em> {itemInCart ? "в корзине " + itemInCart.quantity : " "} </em>
      <FlexCenter className={"input"}>
        <RectButton type={"submit"} disabled={!itemInCart || state < 1} onClick={handeMinus}>
          -
        </RectButton>
        <input
          type="number"
          min="0"
          name="quantity"
          value={state}
          onChange={handle}
        />
        <RectButton type={"submit"} onClick={handePlus}>
          +
        </RectButton>
      </FlexCenter>
      <ButtonSecondary type={"submit"} outlined disabled={itemInCart && state === itemInCart.quantity}
                       className={"add"}>
        в корзину
      </ButtonSecondary>
      <ButtonSecondary onClick={handelDel} outlined disabled={!itemInCart} className={"del"}>отменить </ButtonSecondary>
    </Form>
  );
};
const ConnectedComponent = connect(mapCart, actionsCart)(CartBlock);
export default ConnectedComponent;
