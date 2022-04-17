import React, { FunctionComponent } from "react";
import { mapContent, PropsContent1 } from "../store/helper";
import { Spinner } from "./Elements/SvgSpinner";
import { connect } from "react-redux";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const Check = styled.div`
  grid-area: main;
  padding: 12px;
  opacity: 0.8;
  width: 20px;
  height: 20px;
  justify-self: center;
`;
const Component: FunctionComponent<PropsContent1> = (prop) => {
  const status = prop.status;
  if (status > 200) return <Redirect to={"/Error/" + status} />;
  if (status === 200) return <Check>{status}</Check>;
  return <Check> <Spinner /></Check>;
};
const Connected = connect(mapContent)(Component);
export default Connected;