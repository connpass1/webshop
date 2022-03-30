import React from "react";
import { connect } from "react-redux";
import { ButtonLoader } from "../components/Elements/Button";
import { Loader } from "../components/Loader";
import { mapItems } from "../store/helper";
import { actionsItems } from "../store/storeItem";

type Props = ReturnType<typeof mapItems> & typeof actionsItems;

const component: React.FC<Props> = (props) => {
  const { fetching, errorFetching, getItemsRequest } = props;

  return (
    <>
      <Loader />
      <hr />
      <div>
        <ButtonLoader onClick={getItemsRequest} loader={fetching} text={"GET Items"} />
      </div>
      {errorFetching && <div>{errorFetching}</div>}
      {props.fetching ? <div>Fetching data</div> : <div>{JSON.stringify(props)}</div>}
    </>
  );
};

const connectedComponent = connect(mapItems, actionsItems)(component);
export default connectedComponent;
