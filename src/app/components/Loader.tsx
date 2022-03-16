import React from "react";
import { connect } from "react-redux";
import { actions, IStatePerson } from "../store";
import { ButtonLoader } from "./Button";

const mapStateToProps = (state: IStatePerson) => state;
type Props = ReturnType<typeof mapStateToProps> & typeof actions & { caption: string };

const component: React.FC<Props> = (props) => {
  const fetching = props.fetchingPerson;

  return (
    <>
      <h1>{"xx" + fetching}</h1>
      <div>
        <ButtonLoader onClick={() => props.getPersonRequest()} loader={fetching} text="GET PERSON loader" />
      </div>
      {props.errorFetchingPerson && <div>{props.errorFetchingPerson}</div>}
      {fetching ? (
        <div>Fetching data</div>
      ) : (
        <div>
          {props.person && (
            <div>
              <div>ID: {props.person.id}</div>
              <div>Name: {props.person.name}</div>
              <div>Age: {props.person.age}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const connectedComponent = connect(mapStateToProps, actions)(component);

export { connectedComponent as Loader };
