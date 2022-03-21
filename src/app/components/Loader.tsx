import React from "react";
import { connect } from "react-redux";
import { actionsProfile } from "../store/storeProfile";
import { ButtonLoader } from "./Elements/Button";
const mapStateToProps = (state: any) => state.profileReducer;
type Props = ReturnType<typeof mapStateToProps> & typeof actionsProfile & { caption: string };

const component: React.FC<Props> = (props) => {
  const fetching = props.fetching;
  const { getRequest, Customer, caption } = props;
  return (
    <>
      <h1>{caption}</h1>
      <div>
        <ButtonLoader onClick={() => getRequest()} loader={fetching} text="GET Customer loader" />
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

const connectedComponent = connect(mapStateToProps, actionsProfile)(component);
export { connectedComponent as Loader };
