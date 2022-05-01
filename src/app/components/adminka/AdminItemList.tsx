import React, { useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IItem } from "../../models/IFases";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import Pageable from "../Blocks/Pageable";
import { RedirectButton } from "../Elements/Button";
import { H1, Icon } from "../Elements/Icon";
import { FlexEvenly } from "../Elements/Styled";
import { ChildrenGreed, GridTable, TD, TH } from "../Elements/Table";

const Catalog: React.FC<{ name?: string }> = ({ name }) => {
  if (!name) return null;
  const arr = name.split("@");
  return (
    <TD>
      <Link to={"/admin/catalog/" + arr[1]}>
        <Icon src={arr[2]} />
        {arr[0]}
      </Link>
    </TD>
  );
};

const Articular: React.FC<{ id: number }> = ({ id }) => {
  let s = "" + id;
  while (s.length < 6) {
    s = "0" + s;
  }
  return <TD>{s}</TD>;
};
const Greed = styled(GridTable)`
  grid-template-columns: 90px 1fr 1fr 60px 80px;
`;
const Component: React.FC<any> = (props) => {
  const { content } = props;
  const items = content as IItem[];
  const memo = useMemo(
    () =>
      items.map((item) => (
        <ChildrenGreed key={item.id}>
          <Articular id={item?.id} />
          <TD>
            <Link to={"/admin/item/" + item?.itemDetailId}>
              <Icon src={item?.icon} /> {item?.name}
            </Link>
          </TD>
          <Catalog name={item?.parent} />
          <TD>{item?.quantity} </TD>
          <TD>
            <span className={"price"}>{item?.price}</span>
          </TD>
        </ChildrenGreed>
      )),
    [items]
  );
  return (
    <>
      <Greed className={"content"}>
        <TH>артикул</TH>
        <TH> наименоваеие</TH>
        <TH> каталог</TH>
        <TH> кол-во</TH>
        <TH> цена</TH>
        {memo}
      </Greed>
      <FlexEvenly>
        <div> {items?.length === 0 && <span>Товаров&nbsp;пока&nbsp;нет.</span>}</div>
        <RedirectButton to={"/admin/item/0 "}>Добавить&nbsp;товар</RedirectButton>
      </FlexEvenly>
    </>
  );
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  const content = props.content;
  return (
    <>
      <H1 src="list"> Товар</H1>
      <main>{props.status > 199 && Array.isArray(content?.content) && <Component {...content} />} </main>
      <Pageable pages={content?.totalPages} />
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
