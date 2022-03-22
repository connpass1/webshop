import React from "react";
import { connect } from "react-redux";
import { actionsProfile } from "../store/storeProfile";
import { ButtonLoader } from "./Elements/Button";
import { mapProfile } from "../store/helper";

type Props = ReturnType<typeof mapProfile> & typeof actionsProfile;

const component: React.FC<Props> = (props) => {
  const fetching = props.fetching;
  const { getProfileRequest, Customer } = props;
  return (
    <>
      <h1>loader</h1>
      <div>
        <ButtonLoader onClick={() => getProfileRequest()} loader={fetching} text="GET Customer loader" />
      </div>
      {fetching && <div>{fetching}</div>}
      {fetching ? (
        <div>Fetching data</div>
      ) : (
        <div>
          {Customer && (
            <div>
              <div>ID: {Customer.id}</div>
              <div>Name: {Customer.name}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const connectedComponent = connect(mapProfile, actionsProfile)(component);
export { connectedComponent as Loader };
