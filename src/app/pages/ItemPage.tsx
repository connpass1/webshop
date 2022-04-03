import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Button } from "../components/Elements/Button";
import { Parent } from "../components/Elements/Parent";
import { Spinner } from "../components/Elements/SvgSpinner";
import { CheckFetching } from "../components/Fetching";
import { useFetchingId } from "../components/hooks";
import { mapCart } from "../store/helper";
import { IItem } from "../store/Models";
import { actionsCart } from "../store/storeCart";
import AddToCart from "../components/Blocks/AddToCard";
const Component: FunctionComponent = () => {
  const { status, data } = useFetchingId();
  const item = data as IItem;
  console.log(data);

  if (!data) return <Spinner />;
  return (
    <CheckFetching status={status}>
      <h1>{item.name}</h1>
      <Parent {...item.parent} />
      <hr />
      <p>цена {item.price}</p>
      <p> amount{item.itemDetail.amount}</p>
      <p>property {item.itemDetail.caption}</p>
      <p> description {item.itemDetail.description}</p>
      <AddToCart item={item} />
    </CheckFetching>
  );
};

export default Component;
