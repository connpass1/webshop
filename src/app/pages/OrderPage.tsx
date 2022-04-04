import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ButtonSecondary, BackButton, CheckBox } from "../components/Elements/Button";
import { FlexEnd, Row, Table } from "../components/Elements/Styled";
import { compare, mapCart } from "../store/helper";
import { actionsCart } from "../store/storeCart";
import styled from "styled-components";
import { IItem } from "../store/Models";
type Props = ReturnType<typeof mapCart> & typeof actionsCart;
interface IItemCh extends IItem {
  checked: boolean;
}
const TD = styled.td`
  text-align: center;
  color: var(--secondary-color);
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
const Component: React.FC<Props> = (props) => {
  const { cart } = props;
  const [state, setState] = useState<IItemCh[]>([]);
  const allCheck = useMemo(() => state.find((it) => !it.checked), [state]);
  const oneCheck = useMemo(() => state.find((it) => it.checked), [state]);
  useEffect(() => {
    const arr: IItemCh[] = [];
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
            <TH>
              <CheckBox id={0} handler={handlerAll} check={allCheck === undefined} />
            </TH>
          </tr>
          {state.map((item) => (
            <tr key={item.id}>
              <td>{item.icon} </td>
              <td>
                <Link to={"/item/" + item.id}> {item.name}</Link>
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
      <FlexEnd>
        <ButtonSecondary disabled={oneCheck === undefined} onClick={() => console.log("заказать")}>
          заказать
        </ButtonSecondary>
      </FlexEnd>
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
