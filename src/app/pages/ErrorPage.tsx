import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Column, FlexBetween } from "../components/Elements/Styled";
import { mapContent } from "../store/helper";
import { Spinner } from "../components/Elements/SvgSpinner";
import { BackToCatalog, BackToHistory } from "../components/Elements/Button";
import styled from "styled-components";
import { Icon } from "../components/Elements/Icon";
import { getMessage } from "../data";
import { theme } from "../components/GlobalStyles";
type Props = ReturnType<typeof mapContent>;
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
const Component: FunctionComponent<Props> = (props) => {
  const { status } = props;
  if (status === 100) return <Spinner />;
  if (status < 201) return null;
  return <Div>
    <header><Icon src={"error"} />
      <h1>{getMessage(status)} </h1></header>
    <span>{status}</span>
    <FlexBetween>
      <BackToHistory />
      <BackToCatalog />
    </FlexBetween>
  </Div>;
};
const ConnectedComponent = connect(mapContent)(Component);
const Fetch: FunctionComponent = () => {
  const paths = ["catalog", "user", "order", "cart", "item", "enter", "profile"];
  let { id } = useParams();
  const error404 = !paths.includes(id);
  return <>
    <ConnectedComponent />
    {error404 && <Column>

    </Column>
    }
  </>;
};
export default Fetch;
