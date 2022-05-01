import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import Pageable from "../Blocks/Pageable";
import { H1 } from "../Elements/Icon";
import { GridTable } from "../Elements/Table";
const Greed = styled(GridTable)`
  grid-template-columns: minmax(max-content, 40px) minmax(max-content, 240px) minmax(max-content, 70px) minmax(max-content, 60px) minmax(
      max-content,
      60px
    );
`;
const Component: React.FC<any> = (props) => {
  const { content, totalPages } = props;

  return <>{JSON.stringify(content)}</>;
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  const content = props.content;
  return (
    <>
      <H1 src={"list"}> Заказы</H1>
      <main className={"between"}>{props.status > 199 && content && Array.isArray(content?.content) && <Component {...content} />}</main>
      <Pageable pages={content?.totalPages} />
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
