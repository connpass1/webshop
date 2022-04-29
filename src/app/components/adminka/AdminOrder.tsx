import React from "react";
import styled from "styled-components";
import { device, theme } from "../GlobalStyles";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { connect } from "react-redux";
import { actionsContent } from "../../store/storeContent";


const Styled = styled.div`
  background: ${theme.color.secondaryLight};
  grid-auto-columns: 1fr 1fr 1fr;
  display: inline-grid;
  width: 720px;
  justify-self: center;
  gap: 1px;

  div {
    background: #e80
  }

  @media ${device.tablet} {


  }
`;
const Component: React.FC<any> = (props) => {


  return <Styled>
    <div>1</div>
    <div>2</div>
    <div>3</div>

  </Styled>;
};
const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  if (props.status < 200) return null;
  if (!props.content) return null;

  return <Component {...props.content} />;
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;