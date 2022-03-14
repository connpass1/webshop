import React from "react";
import { connect } from "react-redux";
import { actions, IState } from "../store";

const mapStateToProps = (state: IState) => state;
type Props = ReturnType<typeof mapStateToProps> & typeof actions;

const component: React.FC<Props> = (props) => (
  <>
    <button onClick={() => props.setNavOpen()}>{"ffffff" + props.navbar}</button>
  </>
);

const connectedComponent = connect(mapStateToProps, actions)(component);

export { connectedComponent as NavButton };
