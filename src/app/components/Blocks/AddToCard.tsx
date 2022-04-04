import React, { useState } from "react";
import { connect } from "react-redux";
import { mapCart } from "../../store/helper";
import { IItem } from "../../store/Models";
import { actionsCart } from "../../store/storeCart";
import { Button, BackToCatalog, ButtonSecondary } from "../Elements/Button";
import { FlexAround, Input } from "../Elements/Styled";
type Props = ReturnType<typeof mapCart> &
  typeof actionsCart & {
    item: IItem;
  };

const CartBlock: React.FC<Props> = (prop) => {
  const { item, adToCart, cart } = prop;
  const itemInCart = cart.find((it) => item.id === it.id);
  const [state, setState] = useState(1);

  const handelAdd = () => {
    const item1 = { ...item };
    item1.quantity = state;
    adToCart(item1);
  };
  const handelDel = () => {
    const item1 = { ...item };
    item1.quantity = 0;
    adToCart(item1);
  };

  return (
    <>
      {itemInCart && <p> в корзине {state} </p>}
      <Input
        autoFocus
        style={{ width: "4em" }}
        type="number"
        min="1"
        name="quantity"
        value={state}
        onChange={(v) => setState(parseInt(v.target.value))}
      />

      <Button onClick={handelAdd} disabled={itemInCart?.quantity === state}>
        {itemInCart ? "применить" : "в корзину"}
      </Button>

      {itemInCart && (
        <FlexAround>
          <BackToCatalog />
          <ButtonSecondary onClick={handelDel}> удалить из корзины </ButtonSecondary>
        </FlexAround>
      )}
    </>
  );
};

const ConnectedComponent = connect(mapCart, actionsCart)(CartBlock);
export default ConnectedComponent;
