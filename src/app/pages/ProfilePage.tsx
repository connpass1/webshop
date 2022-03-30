import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../components/Elements/Button";
import { isEqual, mapProfile } from "../store/helper";
import { ICustomer } from "../store/Models";
import { actionsProfile } from "../store/storeProfile";
type Props = ReturnType<typeof mapProfile> & typeof actionsProfile;

const Component: React.FC<Props> = (props) => {
  const [customer, setCustomer] = useState(props.Customer);
  const handler = (event: { target: { name: string | number; value: any } }) => {
    const st = { ...customer } as any;
    st[event.target.name] = event.target.value;
    setCustomer(st as ICustomer);
  };
  const handlerSave = () => {
    props.saveProfileRequest(customer);
  };
  const [edit, setEdit] = useState(false);
  const { fetching, errorFetching, Customer } = props;

  if (!Customer) props.getProfileRequest();
  useEffect(() => {
    setCustomer(Customer);
  }, [Customer]);
  console.log("fetching88: " + fetching);
  if (errorFetching) return <h1>error</h1>;
  if (fetching)
    return (
      <>
        <h1>ProfilePage </h1>
        <p>
          <Link to="/admin"> админка </Link>
        </p>
      </>
    );
  if (!customer?.id) return <h1>ProfilePage </h1>;

  return (
    <>
      <h1>ProfilePage </h1>
      <>
        {edit ? (
          <>
            <p>id - {customer.id}</p>
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
            {edit ? "view" : "edit"}
          </Button>
          {!isEqual(props.Customer, customer) && <Button onClick={handlerSave}>сохранить</Button>}
        </div>
      </>
    </>
  );
};

export default connect(mapProfile, actionsProfile)(Component);
