import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../components/Elements/Icon";
import { theme } from "../components/GlobalStyles";
import { getMessage } from "../components/Blocks/Fetching";


const Div = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 10em;
    color: ${theme.color.primary};
    justify-content: space-between;
    min-height: 100%;
    align-items: flex-end;
  }
`;


const Fetch: FunctionComponent = () => {

  let { id } = useParams();

  return <Div>
    <h1><Icon src={"error"} /> {getMessage(id)} </h1>


    <span>{id}</span>
  </Div>;
};
export default Fetch;
