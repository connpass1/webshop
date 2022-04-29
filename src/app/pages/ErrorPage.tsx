import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { H1 } from "../components/Elements/Icon";
import { theme } from "../components/GlobalStyles";
import { getMessage } from "../components/Blocks/Fetching";


const Div = styled.main`
  justify-items: center;
  justify-content: center;

  font-size: 10em;
  color: ${theme.color.primary};

  min-height: 100%;
  align-items: center;

`;


const Fetch: FunctionComponent = () => {

  let { id } = useParams();

  return <>
    <H1 src={"error"}> {getMessage(id)} </H1>
    <Div>
      {id}
    </Div></>;
};
export default Fetch;
