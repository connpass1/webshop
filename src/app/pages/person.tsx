import React from "react";
import { connect } from "react-redux";
import { ButtonLoader } from "../components/Button";
import { Loader } from "../components/Loader";
import { actions, IStateItems } from "../store/store";

const mapStateToProps = (state: IStateItems) => state;
type Props = ReturnType<typeof mapStateToProps> & typeof actions & { caption: string };

const component: React.FC<Props> = (props) => {
  const fetching = props.fetchingItems;
  const errorFetching = props.errorFetchingItems;
  const item = props.items;

  return (
    <>
      <Loader caption={"loader"} />
      <h1>{props.caption}</h1>
      <div>
        <ButtonLoader onClick={() => props.getItemsRequest()} loader={fetching} text={"GET Items"} />
      </div>
      {errorFetching && <div>{errorFetching}</div>}
      {props.fetchingItems ? (
        <div>Fetching data</div>
      ) : (
        <div>
          {JSON.stringify(props)}
          {item && (
            <div>
              <div>ID: {item.id}</div>
              <div>Name: {item.name}</div>
              <div>Age: {item.age}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const connectedComponent = connect(mapStateToProps, actions)(component);

export { connectedComponent as Person };
