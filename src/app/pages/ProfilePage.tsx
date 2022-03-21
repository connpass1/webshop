import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "../components/Elements/Button";
import { isEqual } from "../store/helper";
import { IFetchCustomer, ICustomer } from "../store/Models";
import { actions } from "../store/store";
type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const Component: React.FC<Props> = (props) => {
  if (!props.Customer) props.getCustomerRequest();

  const fetching = props.fetchingCustomer;
  const errorFetching = props.errorFetchingCustomer;

  if (errorFetching) throw new Error("not find user");
  if (fetching) return <h1>ProfilePage </h1>;
  if (!props.Customer) return <h1>ProfilePage </h1>;
  const saveProfile = (profile: ICustomer) => {
    props.saveProfileRequest(profile);
    console.log(profile);
  };
  return (
    <>
      <h1>ProfilePage </h1>
      <Profile customerProp={props.Customer} handlerSave={saveProfile} />
    </>
  );
};

const Profile: React.FC<{ customerProp: ICustomer; handlerSave: any }> = ({ customerProp, handlerSave }) => {
  const [customer, setCustomer] = useState(customerProp);
  const [edit, setEdit] = useState(false);
  const handler = (event: any) => {
    const st = { ...customer } as any;
    st[event.target.name] = event.target.value;
    setCustomer(st as ICustomer);
  };

  return (
    <>
      {edit ? (
        <>
          <p>id - {customer.id}</p>
          <p>
            <input name="name" value={customer.name} onChange={handler}></input>
          </p>
          <p>
            <input name="name" value={customer.name} onChange={handler}></input>
          </p>

          <p>
            <input name="email" value={customer.email} onChange={handler}></input>
          </p>
          <p>
            <input name="address" value={customer.address} onChange={handler}></input>
          </p>
          <p>
            <input name="avatar" value={customer.avatar} onChange={handler}></input>
          </p>
          <p>
            <input name="phone" value={customer.phone} onChange={handler}></input>
          </p>
        </>
      ) : (
        <>
          <p>id - {customer.id}</p>
          <p>name - {customer.name}</p>
          <p>email - {customer.email}</p>
          <p>address- {customer.address}</p>
          <p>avatar -{customer.avatar}</p>
          <p>phone- {customer.phone}</p>
        </>
      )}
      <div className="row" style={{ width: "100%", justifyContent: "space-between" }}>
        <Button
          onClick={() => {
            setEdit(!edit);
          }}
        >
          {edit ? "edit" : "view"}
        </Button>
        {!isEqual(customerProp, customer) && <Button onClick={() => handlerSave(customer)}>сохранить</Button>}
      </div>
    </>
  );
};

const mapStateToProps = (customer: IFetchCustomer) => customer;
export default connect(mapStateToProps, actions)(Component);
