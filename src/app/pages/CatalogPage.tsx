import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Breadcrumbs from "../components/Blocks/Breadcrumbs";
import { H1, Icon, TextIcon } from "../components/Elements/Icon";
import { ChildrenGreed } from "../components/Elements/Table";
import { theme } from "../components/GlobalStyles";
import { CategoryModel } from "../models/CategoryModel";
import { ISlug } from "../models/IFaces";
import { mapContent, PropsContent, useFetchLocation } from "../store/helper";
import { actionsContent } from "../store/storeContent";

const GridItems = styled.div`
  padding: 12px;
  width: calc(100% - 24px);

  display: grid;
  grid-template-columns: min-content 1fr min-content min-content 40px;
  justify-self: stretch;
  font-size: 17px;
  gap: 0 12px;
  align-items: center;
`;
const LinkA = styled(Link)`
  ${theme.font.Pattaya};
  color: ${theme.color.primary};
  text-decoration: none;
  grid-column-start: 1;
  display: flex;
`;
const Link1 = styled(LinkA)`
  font-size: 1.6rem;
  justify-items: center;
  justify-content: center;
  grid-column-end: 4;
`;
const Link2 = styled(LinkA)`
  ${theme.font.Pattaya};
  font-size: 1.3rem;
  grid-column-end: 2;
`;
const Name = styled.div`
  ${theme.font.cursive};
  grid-column-start: 1;
  grid-column-end: 3;
  flex-flow: row;
  display: flex;
  ::after {
    content: "";
    background-image: linear-gradient(to right, ${theme.color.primary} 33%, white 0%);
    background-position: bottom;
    background-size: 5px 1px;
    background-repeat: repeat-x;
    width: 100%;
    height: 1.3em;
  }
`;

const After = styled.div`
  ${theme.font.Pattaya};
  font-size: 1.2rem;
  ::after {
    padding: 0 4px;
    font-size: 0.8rem;
    ${theme.font.cursive};
  }
`;
const Price = styled(After)`
  grid-column-start: 4;
  grid-column-end: 4;
  ::after {
    content: "р.";
  }
`;

const Mass = styled(After)<{ measure: string }>`
  grid-column-start: 3;
  grid-column-end: 3;
  ::after {
    content: ${(props) => '"' + props.measure + '."'};
  }
`;

const Main = styled.main`
  flex-wrap: nowrap;
`;

export const CatalogLink: React.FC<{ item: ISlug; onClick?: any; className?: string }> = ({ item, onClick, className = "catLink" }) => {
  const handle = () => {
    if (onClick) onClick();
  };
  if (!item.id) return <Link to={`/${item.id}/${item.id}`}> {item.name} </Link>;
  return (
    <Link to={`/catalog/${item.id}`} onClick={handle} className={className}>
      <TextIcon {...item} />
    </Link>
  );
};

const Group: FunctionComponent<{ category: CategoryModel }> = ({ category }) => {
  return (
    <>
      {category.parent.length > 1 ? (
        <Link2 to={"/catalog/" + category.id}>
          <TextIcon {...category} />
        </Link2>
      ) : (
        <Link1 to={"/catalog/" + category.id}>
          <TextIcon {...category} />
        </Link1>
      )}
      {category.childrenCategory?.length > 0 && category.childrenCategory.map((child) => <Group key={child.id} category={child} />)}
      {category.items?.length > 0 &&
        category.items.map((child) => (
          <ChildrenGreed key={child}>
            <Name>{child.name}</Name>
            <Mass measure={child.measure}>{child.mass}</Mass>
            <Price>{child.price}</Price>
            <Icon src={"rect"} />
          </ChildrenGreed>
        ))}
    </>
  );
};

const Component: FunctionComponent<any> = (props) => {
  const catalog = new CategoryModel(props);
  if (!catalog) return null;
  return (
    <>
      <Breadcrumbs parent={catalog.parent} />
      <H1 src={catalog.icon}> {catalog.name}</H1>
      <Main>
        <GridItems>
          {catalog.childrenCategory.map((cat) => (
            <Group category={cat} />
          ))}
        </GridItems>
      </Main>
    </>
  );
};
const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);

  if (props.status < 200) return null;
  if (!props.content) return null;
  return <Component {...props.content} />;
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
