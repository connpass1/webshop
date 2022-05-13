import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArticleModel, createArticleModelList } from "../../models/ArticleModel";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import { H1, Icon } from "../Elements/Icon";
import { MainStart } from "../Elements/Styled";
import { theme } from "../GlobalStyles";

const OL = styled.ol`
  justify-self: stretch;
  align-self: stretch;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);

  a,
  span {
    ${theme.font.Pattaya}
  }
  li {
    ::marker {
      ${theme.font.Pattaya}
      font-size:0.8em;
    }
  }
`;
const LinkSecondary = styled(Link)`
  color: ${theme.color.secondary} !important;
`;
const Component: React.FC<{ articles: ArticleModel[] }> = ({ articles }) => {
  console.log("redraw ArticleList");
  return (
    <>
      <OL>
        {articles.length === 0 && <span>Статей&nbsp;пока&nbsp;нет.</span>}
        {articles.map((a, n) => (
          <li key={a.id}>
            <Link to={"/admin/page/" + a.id}>
              <Icon src={a.icon} /> {a.name}
            </Link>
          </li>
        ))}
        <LinkSecondary to={"/admin/page/0 "}>Добавить&nbsp;статью</LinkSecondary>
      </OL>
    </>
  );
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);

  const model = createArticleModelList(props.content);

  return (
    <>
      <H1 src={"list"}>Статьи</H1>
      <MainStart>{model && <Component articles={model} />}</MainStart>
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component1);

export default FetchContent;
