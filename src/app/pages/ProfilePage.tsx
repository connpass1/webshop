import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ButtonLoader } from "../components/Elements/Button";
import { IFetchItems } from "../store/Models";
import { actions } from "../store/store";
type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const Component: React.FC<Props> = (props) => {
  const [state, setState] = useState();

  useEffect(() => {
    return () => {
      props.getItemsRequest();
    };
  }, []);

  const fetching = props.fetchingItems;
  const errorFetching = props.errorFetchingItems;
  const items = props.items;

  return (
    <>
      <h1>ProfilePage </h1>
      {JSON.stringify(props)}
      <div>
        <ButtonLoader onClick={() => props.getItemsRequest()} loader={fetching} text={"GET  "} />
      </div>
    </>
  );
};

const mapStateToProps = (state: IFetchItems) => state;

const Profile: FunctionComponent = () => {
  const Customer = connectedComponent;
  return (
    <>
      <Customer />
    </>
  );
};
export default Profile;

const connectedComponent = connect(mapStateToProps, actions)(Component);
