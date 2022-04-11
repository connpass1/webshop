import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { actionsUser } from "../../store/storeUser";
import { mapFetchUser } from "../../store/helper";


type Props = ReturnType<typeof mapFetchUser> & typeof actionsUser;

const Component: FunctionComponent<Props> = (props) => {


  return <div className={"add"}> Adminka</div>;

};


const connectedComponent = connect(mapFetchUser, actionsUser)(Component);
export default connectedComponent;