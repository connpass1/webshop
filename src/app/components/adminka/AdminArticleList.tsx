import React from "react";
import { Link } from "react-router-dom";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { connect } from "react-redux";
import { actionsContent } from "../../store/storeContent";
import { H1, Icon } from "../Elements/Icon";
import styled from "styled-components";
import { ArticleModel } from "../../models/ArticleModel";
import Pageable from "../Blocks/Pageable";
import { FlexEvenly } from "../Elements/Styled";
import { RedirectButton } from "../Elements/Button";
import { Children, GridTable, TD, TH } from "../Elements/Table";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: left; 
`;
const Greed = styled(GridTable)`
  grid-template-columns: 40px  1fr  120px 40px    ;
`;
const Component: React.FC<any> = (props) => {
  const { content, totalPages } = props;
  const articles = content as ArticleModel [];
  return < >
    <Greed>
      <TH>N</TH>
      <TH> назвние</TH>
      <TH> расположение</TH>
      <TH>вес</TH>
      {articles?.map((a,n) =><Children>
        <TD>{n+1} </TD>
        <TD>
      <Link key={a.id} to={"/admin/page/" + a.id}>
          <Icon src={a.icon} /> {a.name}  </Link> </TD>
        <TD> {a.nav} </TD>
        <TD> {a.position} </TD>
        </Children> )
      }
    </Greed>
      <FlexEvenly>
        <div>  {articles?.length === 0 && <span>Статей&nbsp;пока&nbsp;нет.</span>}</div>
        < RedirectButton to={"/admin/page/0 "}>Добавить&nbsp;статью</RedirectButton>
      </FlexEvenly>

    <Pageable pages={totalPages} />
  </>;
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  return <><H1 src={"list"}>Cтатьи</H1>
    < main className={"between"}>
      {props.status > 199 && props.content && Array.isArray(props.content?.content) && <Component {...props.content} />}
    </main>
  </>;


};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;