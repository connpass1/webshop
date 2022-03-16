import React from "react";
import { connect } from "react-redux";
import { actions, IStatePerson } from "../store";
import { ButtonLoader } from "./Button";

const mapStateToProps = (state: IStatePerson) => state;
type Props = ReturnType<typeof mapStateToProps> & typeof actions & { caption: string };

const component: React.FC<Props> = (props) => {
  const fetching = props.fetchingPerson;
  const { person, caption } = props;
  return (
    <>
      <h1>{caption}</h1>
      <div>
        <ButtonLoader onClick={() => props.getPersonRequest()} loader={fetching} text="GET PERSON loader" />
      </div>
      {fetching && <div>{fetching}</div>}
      {fetching ? (
        <div>Fetching data</div>
      ) : (
        <div>
          {person && (
            <div>
              <div>ID: {person.id}</div>
              <div>Name: {person.name}</div>
              <div>Age: {person.age}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const connectedComponent = connect(mapStateToProps, actions)(component);

export { connectedComponent as Loader };
