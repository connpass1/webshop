import React from "react";
import { connect } from "react-redux";
import { actions, IState } from "../store";
import { ButtonLoader } from "./Button";

const mapStateToProps = (state: IState) => state;
type Props = ReturnType<typeof mapStateToProps> & typeof actions & { caption: string };

const component: React.FC<Props> = (props) => {
  const loader = props.fetching;

  return (
    <>
      <h1>{"xx" + props.fetching}</h1>
      <div>
        <ButtonLoader onClick={() => props.getPersonRequest()} loader={loader} text="GET PERSON" />
      </div>
      {props.fetching ? (
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
