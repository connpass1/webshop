import React from "react";
import { connect } from "react-redux";
import { ButtonLoader } from "../components/Button";
import { Loader } from "../components/Loader";
import { IState, actions } from "../store";

const mapStateToProps = (state: IState) => state;
type Props = ReturnType<typeof mapStateToProps> & typeof actions & { caption: string };

const component: React.FC<Props> = (props) => (
  <>
    <Loader caption={props.caption} />
    <h1>{props.caption}</h1>
    <div>
      <ButtonLoader onClick={() => props.getPersonRequest()} loader={props.fetching} text={"GET PERSON"} />
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

const connectedComponent = connect(mapStateToProps, actions)(component);

export { connectedComponent as Person };
