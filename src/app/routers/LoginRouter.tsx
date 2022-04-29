import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Logout from "../components/Blocks/Logout";
import { H1 } from "../components/Elements/Icon";
import { theme } from "../components/GlobalStyles";
import { UserModel } from "../models/UserModel";
import { mapContent, useFetchLocation } from "../store/helper";
import { actionsContent } from "../store/storeContent";

const Grid = styled.div`
  background-color: ${theme.color.primaryLight};
  display: grid;
  grid-template-columns: max-content 1fr min-content;
  width: 100%;
`;

type Props = ReturnType<typeof mapContent> & typeof actionsContent & { customer: UserModel };
const RouterComponent: FunctionComponent<Props> = (props) => {
  useFetchLocation(props.contentRequest);

  const { content, status } = props;
  return (
    <>
      <H1 src={"person"}>Личный кабинет</H1>
      <main className={"start"}>
        {JSON.stringify(props.content)}
        <Grid>
          <div />
          <div />
          <Logout />
        </Grid>
      </main>
    </>
  );
};
const connected1 = connect(mapContent, actionsContent)(RouterComponent);
export default connected1;
