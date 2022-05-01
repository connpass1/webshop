import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArticleModel } from "../../models/ArticleModel";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import Pageable from "../Blocks/Pageable";
import { RedirectButton } from "../Elements/Button";
import { H1, Icon } from "../Elements/Icon";
import { FlexEvenly } from "../Elements/Styled";
import { ChildrenGreed, GridTable, TD, TH } from "../Elements/Table";
const Greed = styled(GridTable)`
  grid-template-columns: 40px 1fr 120px 40px;
`;
const Component: React.FC<any> = (props) => {
  const { content } = props;
  const articles = content as ArticleModel[];
  return (
    <>
      <Greed>
        <TH>N</TH>
        <TH> название</TH>
        <TH> расположение</TH>
        <TH>вес</TH>
        {articles?.map((a, n) => (
          <ChildrenGreed>
            <TD>{n + 1} </TD>
            <TD>
              <Link key={a.id} to={"/admin/page/" + a.id}>
                <Icon src={a.icon} /> {a.name}
              </Link>
            </TD>
            <TD> {a.nav} </TD>
            <TD> {a.position} </TD>
          </ChildrenGreed>
        ))}
      </Greed>
      <FlexEvenly>
        <div> {articles?.length === 0 && <span>Статей&nbsp;пока&nbsp;нет.</span>}</div>
        <RedirectButton to={"/admin/page/0 "}>Добавить&nbsp;статью</RedirectButton>
      </FlexEvenly>
    </>
  );
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  const content = props.content;
  return (
    <>
      <H1 src={"list"}>Cтатьи</H1>
      <main className={"between"}>{props.status > 199 && content && Array.isArray(content?.content) && <Component {...content} />}</main>
      <Pageable pages={content?.totalPages} />
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
