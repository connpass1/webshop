import React from "react";
import { connect } from "react-redux";
import { IFetchCustomer } from "../store/Models";
import { actions } from "../store/store";
import { ButtonLoader } from "./Elements/Button";
const mapStateToProps = (state: IFetchCustomer) => state;
type Props = ReturnType<typeof mapStateToProps> & typeof actions & { caption: string };

const component: React.FC<Props> = (props) => {
  const fetching = props.fetchingCustomer;
  const { getCustomerRequest, Customer, caption } = props;
  return (
    <>
      <h1>{caption}</h1>
      <div>
        <ButtonLoader onClick={() => getCustomerRequest()} loader={fetching} text="GET Customer loader" />
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

const connectedComponent = connect(mapStateToProps, actions)(component);
export { connectedComponent as Loader };
