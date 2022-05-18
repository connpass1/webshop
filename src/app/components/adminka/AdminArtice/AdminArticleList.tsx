import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArticleModel } from "../../../models/ArticleModel";
import { H1, Icon } from "../../Elements/Icon";
import { MainStart } from "../../Elements/Styled";
import { theme } from "../../GlobalStyles";
import { LinkSecondary } from "../AdminCatalog/AdminCatalog";

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
      ${theme.font.Bold}
      font-size:0.8em;
    }
  }
`;

const Component: React.FC<{ content?: [] }> = ({ content }) => {
  console.log("redraw ArticleList");
  if (!Array.isArray(content)) return null;
  const articles = content as ArticleModel[];
  return (
    <>
      <H1 src={"list"}>Статьи</H1>
      <MainStart>
        <OL>
          {articles?.length === 0 && <span>Статей&nbsp;пока&nbsp;нет.</span>}
          {articles?.map((a, n) => (
            <li key={a.id}>
              <Link to={"/admin/page/" + a.id}>
                <Icon src={a.icon} /> {a.name}
              </Link>
            </li>
          ))}
        </OL>
        <LinkSecondary to={"/admin/page/0 "}>Добавить&nbsp;статью</LinkSecondary>
      </MainStart>
    </>
  );
};

export default Component;
