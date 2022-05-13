import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { mapFetchUser } from "../../store/helper";

type Props = ReturnType<typeof mapFetchUser>;

const Component: FunctionComponent<Props> = (props) => {
  const { customer } = props;

  if (customer?.role === "ADMIN")
    return (
      <>
        <hr />
        <Link to={"/admin/page/0"}> создать статью</Link>
        <Link to={"/admin/profile/1"}> пользователь</Link>
        <Link to={"/admin/item/6/0"}> создать товар</Link>
        <Link to={"/admin/profiles/1"}> список пользователей</Link>
        <Link to={"/admin/items/1"}> список товаров</Link>
        <Link to={"/admin/pages"}> список статей</Link>
        <Link to={"/admin/orders/1"}> заказ</Link>
        <Link to={"/admin/catalog/1"}>каталог</Link>

        <hr />
      </>
    );
  return null;
};
const connectedComponent = connect(mapFetchUser)(Component);
export default connectedComponent;
