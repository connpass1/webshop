import React from "react";
import { FunctionComponent } from "react";
import Icon from "../components/Elements/Icon";
import { connect } from "react-redux";
import { ButtonLoader } from "../components/Elements/Button";
import { Loader } from "../components/Loader";
import { IFetchItems } from "../store/Models";
import { actions } from "../store/store";

const mapStateToProps = (state: IFetchItems) => state;
type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const component: React.FC<Props> = (props) => {
  const fetching = props.fetchingItems;
  const errorFetching = props.errorFetchingItems;
  const items = props.items;

  return (
    <>
      <Loader caption={"loader"} />
      <hr />
      <div>
        <ButtonLoader onClick={() => props.getItemsRequest()} loader={fetching} text={"GET Items"} />
      </div>
      {errorFetching && <div>{errorFetching}</div>}
      {props.fetchingItems ? (
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

const connectedComponent = connect(mapStateToProps, actions)(component);
export default connectedComponent;
