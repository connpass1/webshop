import React from "react";
import styled from "styled-components";
import { PropsContent } from "../../store/helper";
import { device, theme } from "../GlobalStyles";

const Styled = styled.div`
  background: ${theme.color.secondaryLight};
  grid-auto-columns: 1fr 1fr 1fr;
  display: inline-grid;
  width: 720px;
  justify-self: center;
  gap: 1px;

  div {
    background: #e80;
  }

  @media ${device.tablet} {
  }
`;
const Component: React.FC<PropsContent> = (props) => {
  return (
    <Styled>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Styled>
  );
};

export default Component;
