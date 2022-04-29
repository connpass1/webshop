import React from "react";

import { H1, Icon } from "../Elements/Icon";
import { ICatalog } from "../../models/IFases";
import Pageable from "../Blocks/Pageable";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Children, GridTable, TD, TDC, TH } from "../Elements/Table";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { connect } from "react-redux";
import { actionsContent } from "../../store/storeContent";


const Greed = styled(GridTable)`
  grid-template-columns:40px 2fr 2fr 1fr
`;
const Component: React.FC<any> = (props) => {
  const { content, totalPages, totalElements, pageable } = props;
  const { offset } = pageable;
  if (!totalPages) return null;
  const items = content as ICatalog[];

  return <>
    <H1 src={"list"}>Категории </H1>
    <main>

      <p>Всего {totalElements - 1} категорий в каталоге</p>
      <Greed>
        <TH> N</TH>
        <TH> наименование</TH>
        <TH> каталог</TH>
        <TH> цена</TH>
        {items && items?.map((item, num) => <Children key={item.id}>
          <TD>{(num + 1) + offset}</TD>
          <TDC><Link to={"/catalog/" + item?.id}><Icon src={item?.icon} /> {item?.name}</Link></TDC>
          <TD>{item?.items?.length ? item?.items?.length : 0}</TD>
          <TDC>{item?.childrenCategory?.length ? item?.childrenCategory?.length : 0}</TDC>
        </Children>)}
      </Greed>
      <Pageable pages={totalPages} />
    </main>
  </>;
};
const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  if (props.status < 200) return null;
  if (!props.content) return null;

  return <Component {...props.content} />;
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;