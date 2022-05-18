import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IItem } from "../../models/IFaces";
import { mapCart } from "../../store/helper";
import { actionsCart } from "../../store/storeCart";
import { Icon } from "../Elements/Icon";
import { ButtonSecondary } from "../Elements/Styled";
import { device, theme } from "../GlobalStyles";
type Props = ReturnType<typeof mapCart> &
  typeof actionsCart & {
    item: IItem;
  };
const Grid = styled.div`
  grid-area: add;
  grid-template-areas:
    " mes mes mes  mes mes"
    " .  gr gr gr  ."
    " del del   .   add  add";
  justify-content: center;
  grid-template-columns: max-content 1fr min-content 1fr max-content;
  grid-template-rows: min-content 1fr min-content;
  gap: 6px;
  display: grid;
  border-radius: 0 0 8px 8px;
  background-color: ${theme.color.primaryLight};
  button {
    padding: 8px;
  }
  @media ${device.mobile} {
    border-radius: 0;
  }
  .add {
    grid-area: add;
    justify-self: right;
  }
  .del {
    grid-area: del;
    justify-self: left;
  }

  b {
    grid-area: mes;
    color: ${theme.color.primary};
    padding: 12px;
    font-size: 1.3em;
    border-bottom: 1px solid currentColor;
  }

  justify-content: center;
`;
const GR = styled.div`
  display: flex;
  margin: 0;
  width: 4em;
  margin: 4px;
  font-size: 1.3rem;
  grid-area: gr;
  justify-self: center;
  input {
    font-size: 1.3rem;
    width: 60px;
    margin: 0 12px;
  }
`;
function f(cart: IItem[], item: IItem) {
  return cart.find((it) => item.id === it.id);
}
const RectButton = styled.button`
  color: ${theme.color.secondary};
  border: 1px solid ${theme.color.primary};
  background-color: white;
  font-size: 1.2rem;

  :focus {
    outline: none !important;
    box-shadow: 0 0 5px ${theme.color.primary};
  }
  :disabled {
    color: ${theme.color.greyLight};
    border: 1px solid ${theme.color.greyLight};
    background-color: white;
  }
`;
const CartBlock: React.FC<Props> = (prop) => {
  const { item, adToCart } = prop;

  const itemInCart = useMemo(() => f(prop.cart, prop.item), [prop]);
  const [state, setState] = useState(1);
  useEffect(() => {
    if (itemInCart) setState(itemInCart.quantity);
    else setState(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handelAdd = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const item1 = { ...item };
    item1.quantity = state;
    adToCart(item1);
  };
  const handelPlus = (event: { preventDefault: () => void }) => {
    setState(state + 1);
  };
  const handelMinus = (event: { preventDefault: () => void }) => {
    setState(state - 1);
  };
  const handelDel = () => {
    const item1 = { ...item };
    item1.quantity = 0;
    adToCart(item1);
    setState(0);
  };
  const handle = (v: { target: { value: string } }) => {
    let x = parseInt(v.target.value);
    x = isNaN(x) ? 1 : x;
    setState(x);
  };
  return (
    <Grid>
      {itemInCart && <b> {itemInCart ? "в корзине " + itemInCart.quantity : " "} </b>}
      <GR className={"center"}>
        <RectButton disabled={state < 1} onClick={handelMinus}>
          <Icon src={"chevron_l"} />
        </RectButton>
        <input type="number" min="0" name="quantity" value={state} onChange={handle} />
        <RectButton onClick={handelPlus}>
          <Icon src={"chevron_r"} />
        </RectButton>
      </GR>
      <ButtonSecondary
        onClick={handelAdd}
        outlined
        disabled={(itemInCart && state === itemInCart.quantity) || state === 0}
        className={"add"}
      >
        в&nbsp;корзину
      </ButtonSecondary>
      <ButtonSecondary onClick={handelDel} outlined disabled={!itemInCart} className={"del"}>
        отменить{" "}
      </ButtonSecondary>
    </Grid>
  );
};
const ConnectedComponent = connect(mapCart, actionsCart)(CartBlock);
export default ConnectedComponent;
