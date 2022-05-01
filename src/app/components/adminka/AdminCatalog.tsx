import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import Pageable from "../Blocks/Pageable";
import { H1, Icon } from "../Elements/Icon";
import { ChildrenGreed, GridTable, TD, TDC, TH } from "../Elements/Table";
import { CategoryModel } from "../../models/CategoyModel";
const Greed = styled(GridTable)`
  grid-template-columns: 40px 2fr 2fr 1fr;
`;
const Component: React.FC<any> = (props) => {
  const { content, totalPages, totalElements, pageable } = props;
  const { offset } = pageable;
  if (!totalPages) return null;
  const items = content as   CategoryModel [];
  return (
    <>
      <p>Всего {totalElements - 1} категорий в каталоге</p>
      <Greed>
        <TH> N</TH>
        <TH> наименование</TH>
        <TH> каталог</TH>
        <TH> цена</TH>
        {items &&
          items?.map((item, num) => (
            <ChildrenGreed key={item.id}>
              <TD>{num + 1 + offset}</TD>
              <TDC>
                <Link to={"/catalog/" + item?.id}>
                  <Icon src={item?.icon} /> {item?.name}
                </Link>
              </TDC>
              <TD>{item?.items?.length ? item?.items?.length : 0}</TD>
              <TDC>{item?.childrenCategory?.length ? item?.childrenCategory?.length : 0}</TDC>
            </ChildrenGreed>
          ))}
      </Greed>
    </>
  );
};
const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  const content = props.content;

  return (
    <>
      <H1 src={"list"}>Категории </H1>
      <main> {props.status > 199 && content && <Component {...content} />} </main>
      <Pageable pages={content?.totalPages} />
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
