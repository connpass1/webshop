import React from "react";
import { connect } from "react-redux";
import { ButtonLoader } from "../components/Elements/Button";
import { Loader } from "../components/Loader";
import { actionsProfile } from "../store/storeProfile";

const mapStateToProps = (state: any) => state.itemReducer;
type Props = ReturnType<typeof mapStateToProps> & typeof actionsProfile;

const component: React.FC<Props> = (props) => {
  const fetching = props.fetching;
  const errorFetching = props.profileReducer;
  const items = props.items;

  return (
    <>
      <Loader />
      <hr />
      <div>
        <ButtonLoader onClick={() => props.getItemsRequest()} loader={fetching} text={"GET Items"} />
      </div>
      {errorFetching && <div>{errorFetching}</div>}
      {props.fetching ? (
        <div>Fetching data</div>
      ) : (
        <div>
          {JSON.stringify(props)}
          {items && <div>{items.parents.length}</div>}
        </div>
      )}
    </>
  );
};

const connectedComponent = connect(mapStateToProps, actionsProfile)(component);
export default connectedComponent;
